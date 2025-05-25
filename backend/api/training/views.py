from rest_framework.response import Response
from rest_framework.views import APIView

class BackendView(APIView):
    def get(self, request):
        """
        Handle GET requests to the backend view.
        """
        return Response({"message": "Hello from the backend!"})
