from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets, status
from rest_framework.decorators import action
from .models import TrainingPlan
from .serializers import TrainingPlanSerializer
# from services.gemini_service import GeminiService
from api.goals.models import Goal
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
    
    @action(detail=False, methods=['post'])
    def generate(self, request):
        goal_id = request.data.get('goal_id')
        if not goal_id:
            return Response({"error": "Goal ID is required."}, status=status.HTTP_400_BAD_REQUEST)
        goal = Goal.objects.filter(id = goal_id).first()
        if not goal:
            return Response({"error": "Goal not found."}, status=status.HTTP_404_NOT_FOUND)
        
        # from services.gemini_service import GeminiService
        # gemini_service = GeminiService()
        # ai_response = gemini_service.generate_training_plan(goal)

        plan = TrainingPlan.objects.create(
            gaol=goal,
            plan_name = request.data.get('plan_name', f"{goal.name}のプラン"),
            # ai_generated_content = ai_response
        )

        serializer  = self.get_serializer(plan)
        return Response(serializer.data, status = status.HTTP_201_CREATED)

# AIプラン生成のテスト用
class AIGenerationTestView(APIView):
    """
    AIによるトレーニングプラン生成のテスト用APIエンドポイント。
    フロントエンドからの入力を受け取り、ダミーのAI生成プランを返します。
    実際にAIモデルと連携する際のテンプレートとして使用します。
    """
    # テスト用なので、認証なしでアクセスを許可します。
    permission_classes = [AllowAny] 

    def post(self, request, *args, **kwargs):
        # ここで、フロントエンドから送られてくる入力データ（例: 目標、運動内容など）を
        # 受け取ることができますが、今回はダミーデータを返すため直接は利用しません。
        user_input_data = request.data # 例: {"goal": "体重を減らす", "exercises": "ランニング"}

        # ★★★ ダミーのAI生成プランコンテンツ ★★★
        # 実際にAIを呼び出す場合は、ここにAIサービスとの連携ロジックを記述します。
        # 例: from api.services.gemini_service import generate_ai_plan
        # ai_generated_content = generate_ai_plan(user_input_data)
        
        dummy_ai_plan_content = [
            {
                "date": "2025-06-15",
                "exercise": "<ul><li>テストAIプラン: ウォーミングアップ 5分</li><li>テストAIプラン: スクワット 3セット</li><li>テストAIプラン: ランニング 20分</li></ul>"
            },
            {
                "date": "2025-06-16",
                "exercise": "<ul><li>テストAIプラン: 休息日（アクティブリカバリー）</li><li>テストAIプラン: 軽いストレッチ 10分</li></ul>"
            },
            {
                "date": "2025-06-17",
                "exercise": "<ul><li>テストAIプラン: プッシュアップ 3セット</li><li>テストAIプラン: プランク 3セット</li><li>テストAIプラン: クールダウン 5分</li></ul>"
            },
            {
                "date": "2025-06-18",
                "exercise": "<ul><li>テストAIプラン: ヨガ 45分</li><li>テストAIプラン: 瞑想 15分</li></ul>"
            }
        ]
        
        # 成功レスポンスとして、生成された（ダミーの）プランをJSON形式で返します。
        return Response({"plan": dummy_ai_plan_content}, status=status.HTTP_200_OK)

