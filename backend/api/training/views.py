from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets, status
from rest_framework.decorators import action
from .models import TrainingPlan
from .serializers import TrainingPlanSerializer
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
        """
        GETリクエストのハンドリング。
        現在のユーザーのプラン、または認証されていない場合は全てのプランを返す。
        """
        return TrainingPlan.objects.all()
    
    def perform_create(self, serializer):
        """
        新しいトレーニングプランを作成する際、現在の認証ユーザーを自動的に設定し、
        AIによるプラン生成（ダミー）ロジックを組み込みます。
        """
        # ユーザーが認証されている場合はそのユーザーを、そうでない場合は None を割り当てる
        user_instance = self.request.user if self.request.user and self.request.user.is_authenticated else None
        serializer.validated_data['user'] = user_instance

        # AI連携前の処理：AI生成コンテンツは提供されない場合、ここでダミーデータを設定します。
        # ダミーデータでAIの応答を模倣（例）
        ai_generated_content_for_save = [
            {
                "date": "2025-06-01",
                "exercise": "<ul><li>ウォーミングアップ 5分</li><li>ジョギング 20分</li><li>クールダウン 5分</li></ul>"
            },
            {
                "date": "2025-06-02",
                "exercise": "<ul><li>筋力トレーニング：スクワット 3セット</li><li>プッシュアップ 3セット</li><li>プランク 3セット</li></ul>"
            }
        ]
        # 実際のAI連携では、以下のように呼び出すことを想定
        # from api.services.chatgpt import generate_training_plan
        # ai_generated_content_for_save = generate_training_plan(serializer.validated_data)
        serializer.validated_data['plan'] = ai_generated_content_for_save
        
        # データベースに保存を実行
        # ModelViewSet の perform_create は、serializer.save() を呼び出すことで
        # インスタンスを自動的に作成・保存し、レスポンスを返します。
        serializer.save() 
        
    # ModelViewSet の update/retrieve/delete アクションは自動で提供されます。
    # generate カスタムアクションは不要なので削除します。
    # @action(detail=False, methods=['post'])
    # def generate(self, request, *args, **kwargs):
    #     pass 
            

