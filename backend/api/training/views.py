from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets, status
from rest_framework.decorators import action
from .models import TrainingPlan
from .serializers import TrainingPlanSerializer
# from services.gemini_service import GeminiService
# from api.goals.models import Goal
from rest_framework.permissions import AllowAny


class BackendView(APIView):

    def get(self, request):
        """
        Handle GET requests to the backend view.
        """
        return Response({"message": "Hello from the backend!"})
    

class TrainingViewSet(viewsets.ModelViewSet):
    """
    A viewset for handling training-related operations.
    """
    permission_classes = [AllowAny]
    serializer_class = TrainingPlanSerializer
    
    def get_queryset(self):

        return TrainingPlan.objects.all()
    
    def perform_create(self, serializer):
        user_instance = self.request.user if self.request.user and self.request.user.is_authenticated else None


        # しょう作成したやつをAIで生成した内容を保存する
        # from api.services.chatgpt import generate_training_plan
        #  ai_generated_content_for_save = generate_training_plan(serializer.validated_data)
        ai_generated_content_for_save = [{"date": "2025-06-01","exercise": "<ul><li>ウォーミングアップ 5分</li><li>ジョギング 20分</li><li>クールダウン 5分</li></ul>"},
                                        {"date": "2025-06-02","exercise": "<ul><li>筋力トレーニング：スクワット 3セット</li><li>プッシュアップ 3セット</li><li>プランク 3セット</li></ul>"}
                                        ]
        serializer.validated_data['plan'] = ai_generated_content_for_save
        instance = serializer.save()
        return instance
    
    def create(self, request, *args, **kwargs):
        """オブジェクト作成時にIDのみを返す"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = self.perform_create(serializer)
        return Response({'id': instance.id}, status=status.HTTP_201_CREATED)
    
    # @action(detail=False, methods=['post'])
    # def generate(self, request):
    #     goal_id = request.data.get('goal_id')
    #     if not goal_id:
    #         return Response({"error": "Goal ID is required."}, status=status.HTTP_400_BAD_REQUEST)
    #     goal = Goal.objects.filter(id = goal_id).first()
    
    #         return Response({"error": "Goal not found."}, status=status.HTTP_404_NOT_FOUND)
        
    #     # from services.gemini_service import GeminiService
    #     # gemini_service = GeminiService()
    #     # ai_response = gemini_service.generate_training_plan(goal)

    #     plan = TrainingPlan.objects.create(
    #         goal=goal,
    #         plan_name = request.data.get('plan_name', f"{goal.name}のプラン"),
    #         # ai_generated_content = ai_response
    #     )

    #     serializer  = self.get_serializer(plan)
    #     return Response(serializer.data, status = status.HTTP_201_CREATED)

# AIプラン生成のテスト用
class AIGenerationTestView(APIView):
    """
    AIによるトレーニングプラン生成のテスト用APIエンドポイント。
    実際にAIモデルと連携する際のテンプレートとして使用します。
    """
    # テスト用なので、認証なしでアクセスを許可します。
    permission_classes = [AllowAny] 
    
    def post(self, request, *args, **kwargs):
        # ここで、フロントエンドから送られてくる入力データ（例: 目標、運動内容など）を
        user_input_data = request.data # 例: {"goal": "体重を減らす", "exercises": "ランニング"}

        # 実際にAIを呼び出す場合は、ここにAIサービスとの連携ロジックを記述します。
        from api.services.chatgpt import generate_training_plan
        ai_generated_content = generate_training_plan(user_input_data)
        
        # 成功レスポンスとして、生成された（ダミーの）プランをJSON形式で返します。
        return Response({"plan": ai_generated_content}, status=status.HTTP_200_OK)

# このビューは、AIによるトレーニングプラン生成のテスト用です。