package com.stegappasaurus;

import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.content.Intent;
import android.content.res.Configuration;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.modules.storage.ReactDatabaseSupplier;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.ReactRootView;

import org.devio.rn.splashscreen.SplashScreen;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;


public class MainActivity extends ReactActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        String isDarkTheme = this.getAsyncStorageValue(getApplicationContext(), "@Theme");
        Boolean isDark = Boolean.parseBoolean(isDarkTheme);
        int globalDarkMode = (getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK);

        if(isDark == true || globalDarkMode == Configuration.UI_MODE_NIGHT_YES) {
            setTheme(R.style.DarkTheme);
        }
        else {
            setTheme(R.style.LightTheme);
        }

        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
    }

    /**
     * Returns the name of the main component registered from JavaScript. This is
     * used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "stegappasaurus";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        sendBroadcast(intent);
    }

    private String getAsyncStorageValue(Context context, String storageKey) {
        SQLiteDatabase readableDatabase = null;
        readableDatabase = ReactDatabaseSupplier.getInstance(context).getReadableDatabase();
        Cursor catalystLocalStorage = readableDatabase.query("catalystLocalStorage", null, null, null, null, null, null);

        try {
            if (catalystLocalStorage.moveToFirst()) {

                do {
                    String key = catalystLocalStorage.getString(0);
                    String value = catalystLocalStorage.getString(1);

                    if(storageKey.equals(key)) {
                        return value;
                    }
                } while (catalystLocalStorage.moveToNext());
            }
        } finally {
            if (catalystLocalStorage != null) {
                catalystLocalStorage.close();
            }

            if (readableDatabase != null) {
                readableDatabase.close();
            }
        }

        return "";

    }
}
