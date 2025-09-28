import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_compass/flutter_compass.dart';
import 'package:vector_math/vector_math_64.dart' as vector;
import 'package:ar_flutter_plugin_2/ar_flutter_plugin.dart';
import 'package:ar_flutter_plugin_2/datatypes/node_types.dart';
import 'package:ar_flutter_plugin_2/managers/ar_anchor_manager.dart';
import 'package.ar_flutter_plugin_2/managers/ar_location_manager.dart';
import 'package:ar_flutter_plugin_2/managers/ar_object_manager.dart';
import 'package:ar_flutter_plugin_2/managers/ar_session_manager.dart';
import 'package:ar_flutter_plugin_2/models/ar_node.dart';

class ARScreen extends StatefulWidget {
  final String modelUrl;

  const ARScreen({super.key, required this.modelUrl});

  @override
  State<ARScreen> createState() => _ARScreenState();
}

class _ARScreenState extends State<ARScreen> {
  late ARSessionManager arSessionManager;
  late ARObjectManager arObjectManager;
  ARNode? _modelNode;
  StreamSubscription<CompassEvent>? _compassSubscription;
  String? _lastDirection;

  // --- FIX: Add a flag to track if the AR view is ready ---
  bool _arReady = false;

  @override
  void initState() {
    super.initState();
    _compassSubscription = FlutterCompass.events!.listen((event) {
      if (event.heading == null) return;
      String newDirection = _getDirection(event.heading!);
      if (newDirection != _lastDirection) {
        _lastDirection = newDirection;
        // --- FIX: Only show the model if the AR view is ready ---
        if (_arReady) {
          _showModelForDirection(newDirection);
        }
      }
    });
  }

  String _getDirection(double heading) {
    if (heading >= 315 || heading < 45) return 'North';
    if (heading >= 45 && heading < 135) return 'East';
    if (heading >= 135 && heading < 225) return 'South';
    return 'West';
  }

  void onARViewCreated(
      ARSessionManager sessionManager,
      ARObjectManager objectManager,
      ARAnchorManager anchorManager,
      ARLocationManager locationManager) {
    arSessionManager = sessionManager;
    arObjectManager = objectManager;

    arSessionManager.onInitialize(
      showFeaturePoints: false,
      showPlanes: true,
      customPlaneTexturePath: "assets/triangle.png",
      showWorldOrigin: true,
      handleTaps: true,
    );
    arObjectManager.onInitialize();

    // --- FIX: Set the flag to true once initialization is complete ---
    setState(() {
      _arReady = true;
    });

    // Show the initial model once the view is ready
    if (_lastDirection != null) {
      _showModelForDirection(_lastDirection!);
    }
  }

  Future<void> _showModelForDirection(String direction) async {
    // --- FIX: Add a guard to prevent errors if not ready ---
    if (!_arReady) return;

    if (_modelNode != null) {
      await arObjectManager.removeNode(_modelNode!);
    }

    // Simple logic to place the model in front of the camera based on direction
    final transform = vector.Matrix4.identity()
      ..translate(vector.Vector3(0, -0.5, -2.0)); // Place 2 meters in front

    var newNode = ARNode(
      type: NodeType.webGLB,
      uri: widget.modelUrl,
      scale: vector.Vector3(0.2, 0.2, 0.2),
      position: vector.Vector3(0, 0, 0),
      rotation: vector.Vector4(1.0, 0.0, 0.0, 0.0),
      transformation: transform,
    );

    bool? didAdd = await arObjectManager.addNode(newNode);
    if (didAdd ?? false) {
      _modelNode = newNode;
    }
  }

  @override
  void dispose() {
    _compassSubscription?.cancel();
    arSessionManager.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('AR View')),
      body: ARView(
        onARViewCreated: onARViewCreated,
      ),
    );
  }
}