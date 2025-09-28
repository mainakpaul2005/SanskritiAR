// In android/build.gradle.kts

import com.android.build.gradle.LibraryExtension
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

val newBuildDir: Directory =
    rootProject.layout.buildDirectory
        .dir("../../build")
        .get()
rootProject.layout.buildDirectory.set(newBuildDir)

subprojects {
    val newSubprojectBuildDir: Directory = newBuildDir.dir(project.name)
    project.layout.buildDirectory.set(newSubprojectBuildDir)
}

tasks.register<Delete>("clean") {
    delete(rootProject.layout.buildDirectory)
}

subprojects {
    afterEvaluate {
        val android = extensions.findByType<LibraryExtension>()
        if (android != null) {
            // Specific fix for ar_flutter_plugin's incorrect manifest package
            if (project.name == "ar_flutter_plugin") {
                android.namespace = "io.carius.lars.ar_flutter_plugin"
            }
            // Fallback for any other plugins that might need a namespace
            if (android.namespace == null) {
                android.namespace = "com.example.${project.name}"
            }

            // ✅ Force Java 17 for all Android modules
            android.compileOptions {
                sourceCompatibility = JavaVersion.VERSION_17
                targetCompatibility = JavaVersion.VERSION_17
            }
        }

        // ✅ Force Kotlin to target JVM 17 for all modules
        tasks.withType<KotlinCompile>().configureEach {
            kotlinOptions {
                jvmTarget = "17"
            }
        }
    }
}
