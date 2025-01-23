from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import datetime

class TimeView(APIView):
    def get(self, request):
        current_time = datetime.now().strftime("%H:%M:%S")
        return Response({"time": current_time})