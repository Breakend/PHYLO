This port of Phylo was made using phonegap and cordova. For future reference there should only be a few changes made to make the android version work. A list of these changes can be found here for easy porting of new code.

Changes made for compatability with android:

-The PHYLO-main.js file was modified under /scripts/PHYLO-main.js to add the phonegap folder libraries
-in the same main file, a local storage module was added:  
'phonegap/storage.phonegap':{
                deps:['jquery','bootstrap','jquery.xml2json','DNA/protocal.core','phonegap/cordova-2.5.0']
            },
-TODO: might need to modify require yepnope to force tablet mode


Steps to build...

1.) Run .../Phylo/cordova/build (with --debug or --release)
	1.1) If that doesn't work, you probably need to either run the suggested android clean project
	 1.1.1) If all else fails, try ant -f xyz/build.xml clean release -Dsdk.dir=/Applications/adt-bundle-mac/sdk/ in the home directory of Phylo  OR export ANDROID_HOME=<path/to/android/sdk>

2.) Have to go through an change the base directory for the scripts, have to do this in ALL the templates and scripts or else it will cause problems (most likely remove the assets/ part)
