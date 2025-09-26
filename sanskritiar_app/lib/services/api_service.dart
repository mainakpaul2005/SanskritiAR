import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  // Use 10.0.2.2 for Android emulator, or your computer's local IP for a real device
  final String _baseUrl = "http://10.0.2.2:8000/api";

  Future<Map<String, dynamic>> fetchPoiContent(int poiId) async {
    final response = await http.get(Uri.parse('$_baseUrl/pois/generate-content/$poiId'));

    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to load content from API. Status code: ${response.statusCode}');
    }
  }
}