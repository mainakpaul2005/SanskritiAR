import 'package:flutter/material.dart';
import 'package:sanskritiar_app/screens/ar_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('SanskritiAR'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Explore India\'s Heritage in AR',
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            ElevatedButton.icon(
              icon: const Icon(Icons.camera),
              label: const Text('Launch On-Site Mode'),
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 15),
                textStyle: const TextStyle(fontSize: 16),
              ),
              onPressed: () {
                // We pass a mock POI ID for testing
                // NEW CORRECTED LINE
                Navigator.push(context, MaterialPageRoute(builder: (context) => const ARScreen(modelUrl: '',)));
              },
            ),
          ],
        ),
      ),
    );
  }
}