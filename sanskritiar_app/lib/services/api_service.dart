// sanskritiar_app/lib/services/api_service.dart

import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  // --- CHANGE START ---
  // The base URL of your backend API.
  // For Android emulator, use 10.0.2.2. For iOS simulator, use localhost.
  static const String _baseUrl = 'http://10.0.2.2:8000';
  // --- CHANGE END ---

  /// Fetches a list of all POIs from the backend.
  static Future<List<dynamic>> fetchPois() async {
    final response = await http.get(Uri.parse('$_baseUrl/pois/'));

    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load POIs');
    }
  }

  // --- CHANGE START ---
  /// Fetches a single POI by its direction.
  static Future<Map<String, dynamic>?> fetchPoiByDirection(String direction) async {
    final response = await http.get(Uri.parse('$_baseUrl/pois/direction/$direction'));

    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      // Return null if the POI is not found.
      return null;
    }
  }
  // --- CHANGE END ---
}