// sanskritiar_app/lib/screens/home_screen.dart

import 'package:flutter/material.dart';
import 'package:sanskritiar_app/screens/ar_screen.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('SanskritiAR'),
      ),
      body: Center(
        child: ElevatedButton(
          child: Text('Start AR Experience'),
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => DirectionalARScreen()),
            );
          },
        ),
      ),
    );
  }
}