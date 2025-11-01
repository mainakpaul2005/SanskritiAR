package com.sanskritiar

import android.os.Build
import android.os.Bundle
import android.view.Window
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "SanskritiAR"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  /**
   * Enable high refresh rate (90Hz, 120Hz, 144Hz+) for supported devices
   */
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    
    // Enable high refresh rate for Android 11+ (API 30+)
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
      val window: Window = window
      // Request highest available refresh rate
      window.attributes.preferredDisplayModeId = 0 // 0 means highest available
    }
  }
}
