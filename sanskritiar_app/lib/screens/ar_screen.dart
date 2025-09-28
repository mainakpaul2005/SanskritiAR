import 'dart:async';
// --- Start of replacement ---
import 'package:ar_flutter_plugin_2/ar_flutter_plugin.dart';
import 'package:ar_flutter_plugin_2/datatypes/node_types.dart';
import 'package:ar_flutter_plugin_2/managers/ar_anchor_manager.dart';
import 'package:ar_flutter_plugin_2/managers/ar_location_manager.dart';
import 'package:ar_flutter_plugin_2/managers/ar_object_manager.dart';
import 'package:ar_flutter_plugin_2/managers/ar_session_manager.dart';
import 'package:ar_flutter_plugin_2/models/ar_node.dart';
// --- End of replacement ---
import 'package:flutter/material.dart';
import 'package:flutter_compass/flutter_compass.dart';
import 'package:vector_math/vector_math_64.dart';

class ARScreen extends StatefulWidget {
  // Remove the 'poiId' parameter as it's no longer used
  const ARScreen({super.key});

  @override
  State<ARScreen> createState() => _ARScreenState();
}

class _ARScreenState extends State<ARScreen> {
  late ARSessionManager arSessionManager;
  late ARObjectManager arObjectManager;
  StreamSubscription<CompassEvent>? _compassSubscription;
  ARNode? _modelNode;
  String? _activeDirection;

  // --- CONFIGURATION ---
  // TODO: CHANGE THIS TO YOUR COMPUTER'S WI-FI IP ADDRESS
  static const String backendIp = "103.242.196.116"; // Replace with your IP

  final Map<String, Map<String, dynamic>> _directionalModels = {
    "North": {
      "min_heading": 315.0,
      "max_heading": 45.0,
      "url": "http://$backendIp:8000/models/model_A.glb",
    },
    "East": {
      "min_heading": 45.0,
      "max_heading": 135.0,
      "url": "http://$backendIp:8000/models/model_B.glb",
    },
  };

  @override
  void initState() {
    super.initState();
    _compassSubscription = FlutterCompass.events?.listen(_onCompassData);
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
      appBar: AppBar(title: const Text('Point Towards a Direction')),
      body: ARView(onARViewCreated: _onARViewCreated),
    );
  }

  void _onARViewCreated(
      ARSessionManager sessionManager,
      ARObjectManager objectManager,
      ARAnchorManager anchorManager,
      ARLocationManager locationManager,
      ) {
    arSessionManager = sessionManager;
    arObjectManager = objectManager;

    arSessionManager.onInitialize(
      showFeaturePoints: false,
      showPlanes: false,
      handleTaps: false,
    );
    arObjectManager.onInitialize();
  }

  void _onCompassData(CompassEvent event) {
    double? heading = event.heading;
    if (heading == null) return;

    String? targetDirection;

    for (var entry in _directionalModels.entries) {
      final String direction = entry.key;
      final double min = entry.value["min_heading"];
      final double max = entry.value["max_heading"];

      if (direction == "North"
          ? (heading >= min || heading < max)
          : (heading >= min && heading < max)) {
        targetDirection = direction;
        break;
      }
    }

    if (targetDirection != null && _activeDirection != targetDirection) {
      _activeDirection = targetDirection;
      _showModelForDirection(targetDirection);
    } else if (targetDirection == null && _activeDirection != null) {
      _activeDirection = null;
      _removeActiveModel();
    }
  }

  Future<void> _showModelForDirection(String direction) async {
    await _removeActiveModel();
    final modelData = _directionalModels[direction];
    if (modelData == null) return;

    // NEW CORRECTED CODE
    var newNode = ARNode(
      type: NodeType.webGLB,
      uri: modelData["url"],
      scale: Vector3(0.2, 0.2, 0.2),
      position: Vector3(0.0, -0.5, -2.0),
      rotation: Vector4(1.0, 0.0, 0.0, 0.0),
    );

    bool? didAdd = await arObjectManager.addNode(newNode);
    if (didAdd == true) {
      _modelNode = newNode;
    }
  }

  Future<void> _removeActiveModel() async {
    if (_modelNode != null) {
      await arObjectManager.removeNode(_modelNode!);
      _modelNode = null;
    }
  }
}