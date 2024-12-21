const {
  withAndroidManifest,
  createRunOncePlugin,
  withDangerousMod,
} = require('@expo/config-plugins');

const path = require('node:path');
const fs = require('node:fs');
const {
  mergeContents,
} = require('@expo/config-plugins/build/utils/generateCode');

const withAmazonPaymentServicesAndroid = (config) => {
  // First apply the manifest modifications
  const manifestConfig = withAndroidManifest(config, (config) => {
    const androidManifest = config.modResults;

    // Ensure internet activity is added
    const internetActivity = {
      $: {
        'android:name': 'android.permission.INTERNET',
        'android:exported': 'true',
      },
    };

    // Add android.permission.ACCESS_NETWORK_STATE
    const networkStatePermission = {
      $: {
        'android:name': 'android.permission.ACCESS_NETWORK_STATE',
      },
    };

    // Add activity to AndroidManifest
    if (!androidManifest.manifest.application[0].activity) {
      androidManifest.manifest.application[0].activity = [];
    }
    androidManifest.manifest.application[0].activity.push(internetActivity);
    androidManifest.manifest.application[0].activity.push(
      networkStatePermission
    );

    return config;
  });

  // Then apply the build.gradle modifications
  return withDangerousMod(manifestConfig, [
    'android',
    async (config) => {
      const filePath = path.join(
        config.modRequest.projectRoot,
        'android/build.gradle'
      );

      try {
        const contents = fs.readFileSync(filePath, 'utf-8');

        if (!contents.includes('android-sdk.payfort.com')) {
          let modifiedContents = contents;

          // Find the last maven entry in allprojects repositories block
          const allProjectsRepoMatch = contents.match(
            /allprojects\s*{[^}]*repositories\s*{[^}]*}/s
          );

          if (allProjectsRepoMatch) {
            const currentBlock = allProjectsRepoMatch[0];
            const lastMavenIndex = currentBlock.lastIndexOf('maven');
            const insertPoint =
              lastMavenIndex !== -1
                ? contents.indexOf(currentBlock) + lastMavenIndex
                : contents.indexOf(currentBlock) +
                  currentBlock.indexOf('repositories {') +
                  'repositories {'.length;

            modifiedContents = `${contents.slice(
              0,
              insertPoint
            )}\n        maven { url "https://android-sdk.payfort.com" }\n${contents.slice(
              insertPoint
            )}`;

            fs.writeFileSync(filePath, modifiedContents);
          } else {
            throw new Error(
              'Could not find allprojects repositories block in build.gradle'
            );
          }
        }

        return config;
      } catch (error) {
        throw new Error(`Failed to modify root build.gradle: ${error.message}`);
      }
    },
  ]);
};

const withAmazonPaymentServicesIOS = (config) => {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const filePath = path.join(
        config.modRequest.platformProjectRoot,
        'Podfile'
      );
      const contents = fs.readFileSync(filePath, 'utf-8');

      // First merge - changed tag
      const amazonPaymentPodfileDep = mergeContents({
        tag: 'add Amazon payment SDK pod dependency', // Different tag
        src: contents,
        newSrc: [`pod 'PayFortSDK'`].join('\n'),
        anchor: 'use_expo_modules!',
        offset: 1,
        comment: '#',
      });

      // Second merge - use first merge result and different tag
      const amazonPaymentTarget = mergeContents({
        tag: 'add Amazon payment SDK build settings', // Different tag
        src: amazonPaymentPodfileDep.contents,
        newSrc: [
          `installer.pods_project.targets.each do |target|
          if ['PayFortSDK'].include? target.name
            target.build_configurations.each do |config|
                config.build_settings['BUILD_LIBRARY_FOR_DISTRIBUTION'] = 'YES'
            end
          end
        end`,
        ].join('\n'),
        anchor:
          '# This is necessary for Xcode 14, because it signs resource bundles by default',
        offset: 1,
        comment: '#',
      });

      fs.writeFileSync(filePath, amazonPaymentTarget.contents);

      return config;
    },
  ]);
};

const withAmazonPaymentServices = (config) => {
  config = withAmazonPaymentServicesAndroid(config);
  config = withAmazonPaymentServicesIOS(config);
  return config;
};

module.exports = createRunOncePlugin(
  withAmazonPaymentServices,
  'withAmazonPaymentServicesPlugin',
  '1.0.0'
);
