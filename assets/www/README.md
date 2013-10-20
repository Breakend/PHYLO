This port of Phylo was made using phonegap and cordova. For future reference there should only be a few changes made to make the android version work. A list of these changes can be found here for easy porting of new code.

Changes made for compatability with android:

-The PHYLO-main.js file was modified under /scripts/PHYLO-main.js to add the phonegap folder libraries
-in the same main file, a local storage module was added:  
'phonegap/storage.phonegap':{
                deps:['jquery','bootstrap','jquery.xml2json','DNA/protocal.core','phonegap/cordova-2.5.0']
            },
-In protocol.core.js, some changes were made to check connection before asking for login and in the tablet view a warning check was added if there is no connection
-Also need to put puzzles into models/puzzles
-Need to update some parts of protocol.core.js and the login system to check for connections as well as get the puzzles locally rather than requesting if there is no connection


Steps to build...

1.) Run .../Phylo/cordova/build (with --debug or --release)
	1.1) If that doesn't work, you probably need to either run the suggested android clean project
	 1.1.1) If all else fails, try ant -f xyz/build.xml clean release -Dsdk.dir=/Applications/adt-bundle-mac/sdk/ in the home directory of Phylo  OR export ANDROID_HOME=<path/to/android/sdk>

2.) To run on Android cd into ../cordova and ./run
3.) To get logs run the command in a different shell: adb logcat CordovaLog:D *:S
