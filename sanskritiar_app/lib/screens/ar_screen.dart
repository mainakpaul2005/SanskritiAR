// sanskritiar_app/lib/screens/ar_screen.dart

import 'package:flutter/material.dart';
// --- All these imports are from the ar_flutter_plugin package ---
import 'package:ar_flutter_plugin/ar_flutter_plugin.dart';
import 'package:ar_flutter_plugin/datatypes/node_types.dart';
import 'package:ar_flutter_plugin/models/ar_node.dart';
import 'package:ar_flutter_plugin/managers/ar_object_manager.dart';
import 'package:ar_flutter_plugin/managers/ar_session_manager.dart';
import 'package:ar_flutter_plugin/managers/ar_anchor_manager.dart';
import 'package:ar_flutter_plugin/managers/ar_location_manager.dart';

import 'package:flutter_compass/flutter_compass.dart';
import 'package:vector_math/vector_math_64.dart' as vector;
import 'package:sanskritiar_app/services/api_service.dart';

class DirectionalARScreen extends StatefulWidget {
  @override
  _DirectionalARScreenState createState() => _DirectionalARScreenState();
}

class _DirectionalARScreenState extends State<DirectionalARScreen> {
  // --- CHANGE: We will use the ARObjectManager to handle 3D models.
  late ARObjectManager arObjectManager;

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

      if (newDirection != _direction) {
        setState(() {
          _direction = newDirection;
        });
        // Check if the arObjectManager is initialized before using it.
        if (this.arObjectManager != null) {
          _updateARModel();
        }
      }
    });
  }

  /// Fetches the POI for the current direction and updates the AR model.
  Future<void> _updateARModel() async {
    // --- CHANGE: Use the object manager to remove the node.
    if (_arNode != null) {
      arObjectManager.removeNode(_arNode!);
    }

    final poi = await ApiService.fetchPoiByDirection(_direction);
    if (poi != null) {
      final node = ARNode(
        type: NodeType.webGLB,
        uri: 'http://10.0.2.2:8000/${poi['model_path']}',
        scale: vector.Vector3(0.5, 0.5, 0.5),
        position: vector.Vector3(0.0, 0.0, -2.0),
      );
      // --- CHANGE: Use the object manager to add the new node.
      arObjectManager.addNode(node);
      _arNode = node;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('AR View - Facing: $_direction')),
      body: ARView(
        // --- CHANGE START ---
        // As the error message indicates, onARViewCreated provides these managers.
        // We capture the objectManager to use it for adding/removing models.
        onARViewCreated: (ARSessionManager sessionManager, ARObjectManager objectManager, ARAnchorManager anchorManager, ARLocationManager locationManager) {
          this.arObjectManager = objectManager;
          _updateARModel(); // Load the initial model.
        },
        // --- CHANGE END ---
      ),
    );
  }
}