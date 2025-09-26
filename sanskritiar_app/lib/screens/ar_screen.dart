import 'package:ar_flutter_plugin/ar_flutter_plugin.dart';
import 'package:ar_flutter_plugin/datatypes/node_types.dart';
import 'package:ar_flutter_plugin/managers/ar_anchor_manager.dart';
import 'package:ar_flutter_plugin/managers/ar_location_manager.dart';
import 'package:ar_flutter_plugin/managers/ar_object_manager.dart';
import 'package:ar_flutter_plugin/managers/ar_session_manager.dart';
import 'package:ar_flutter_plugin/models/ar_node.dart';
import 'package:flutter/material.dart';
import 'package:vector_math/vector_math_64.dart' as vector;
import 'package:sanskritiar_app/services/api_service.dart';

class ArScreen extends StatefulWidget {
  final int poiId;
  const ArScreen({super.key, required this.poiId});

  @override
  State<ArScreen> createState() => _ArScreenState();
}

class _ArScreenState extends State<ArScreen> {
  late ARSessionManager arSessionManager;
  late ARObjectManager arObjectManager;
  final ApiService apiService = ApiService();
  String objectUrl = "https://github.com/KhronosGroup/glTF-Sample-Models/raw/master/2.0/Duck/glTF-Binary/Duck.glb";

  @override
  void dispose() {
    arSessionManager.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Tap a Plane to Place Object')),
      body: ARView(onARViewCreated: onARViewCreated),
    );
  }

  void onARViewCreated(
      ARSessionManager sessionManager,
      ARObjectManager objectManager,
      ARAnchorManager anchorManager,
      ARLocationManager locationManager,
      ) {
    arSessionManager = sessionManager;
    arObjectManager = objectManager;

    arSessionManager.onInitialize(
      showFeaturePoints: false,
      showPlanes: true,
      showWorldOrigin: false,
    );
    arObjectManager.onInitialize();

    arSessionManager.onPlaneOrPointTap = onPlaneOrPointTapped;
  }

  Future<void> onPlaneOrPointTapped(List<ARHitTestResult> hitTestResults) async {
    var singleHitTestResult = hitTestResults.firstWhere(
            (hitTestResult) => hitTestResult.type == ARHitTestResultType.plane);

    // Show a loading indicator
    ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Fetching historical data...')));

    try {
      // Fetch content from our backend
      final content = await apiService.fetchPoiContent(widget.poiId);

      // Add the 3D object to the scene
      var newNode = ARNode(
        type: NodeType.webGLB,
        uri: objectUrl, // This will be the 3D card model
        scale: vector.Vector3(0.2, 0.2, 0.2),
        transformation: singleHitTestResult.worldTransform,
      );

      await arObjectManager.addNode(newNode);

      // Show the fetched text in a dialog
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text('Did you know?'),
            content: Text(content['text']),
            actions: [
              TextButton(
                child: const Text('Close'),
                onPressed: () => Navigator.of(context).pop(),
              ),
            ],
          );
        },
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: ${e.toString()}'))
      );
    }
  }
}