// sanskritiar_app/lib/screens/ar_screen.dart

import 'package:flutter/material.dart';
import 'package:ar_flutter_plugin/ar_flutter_plugin.dart';
import 'package:ar_flutter_plugin/models/ar_node.dart';
import 'package:flutter_compass/flutter_compass.dart';
import 'package:vector_math/vector_math_64.dart' as vector;
import 'package:sanskritiar_app/services/api_service.dart';

class DirectionalARScreen extends StatefulWidget {
  @override
  _DirectionalARScreenState createState() => _DirectionalARScreenState();
}

class _DirectionalARScreenState extends State<DirectionalARScreen> {
  late ARViewController arViewController;
  ARNode? _arNode;
  String _direction = 'North'; // Default direction

  @override
  void initState() {
    super.initState();
    _listenToCompass();
  }

  /// Listens to the compass events and updates the direction.
  void _listenToCompass() {
    FlutterCompass.events!.listen((CompassEvent event) {
      final heading = event.heading;
      if (heading == null) return;

      String newDirection;
      if (heading >= 315 || heading < 45) {
        newDirection = 'North';
      } else if (heading >= 45 && heading < 135) {
        newDirection = 'East';
      } else if (heading >= 135 && heading < 225) {
        newDirection = 'South';
      } else {
        newDirection = 'West';
      }

      // Only update the model if the direction has changed.
      if (newDirection != _direction) {
        setState(() {
          _direction = newDirection;
        });
        _updateARModel();
      }
    });
  }

  /// Fetches the POI for the current direction and updates the AR model.
  Future<void> _updateARModel() async {
    // Remove the old model if it exists.
    if (_arNode != null) {
      arViewController.removeNode(_arNode!);
    }

    // Fetch the new model from the API.
    final poi = await ApiService.fetchPoiByDirection(_direction);
    if (poi != null) {
      final node = ARNode(
        type: NodeType.webGLB,
        uri: 'http://10.0.2.2:8000/${poi['model_path']}',
        scale: vector.Vector3(0.5, 0.5, 0.5),
        position: vector.Vector3(0.0, 0.0, -2.0),
      );
      arViewController.addARNode(node);
      _arNode = node;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('AR View - Facing: $_direction')),
      body: ARView(
        onARViewCreated: (ARViewController controller) {
          arViewController = controller;
          // Load the initial model.
          _updateARModel();
        },
      ),
    );
  }
}