from rest_framework import serializers
from .models import TrainingPlan, TrainingSession

class TrainingPlanSerializer(serializers.ModelSerializer):
    """
    TrainingPlan モデルのインスタンスをJSONに変換（またはJSONからモデルインスタンスを作成/更新）
    するためのシリアライザー。
    AI連携前の基本的なCRUD操作に使用します。
    """
    # user フィールドは、現在のユーザーが自動的に設定されるため、読み取り専用とします。
    # APIのレスポンスには含みますが、クライアントが直接設定するフィールドではありません。
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    
    class Meta:
        model = TrainingPlan
        # CRUDに必要な全てのフィールドを含めます。
        fields = [
            'id', 'user', 'name', 'exercises', 'goal', 
            'frequency', 'start_date', 'end_date', 'plan', 
            'status', 'created_at', 'updated_at'
        ]
        # read_only_fields = ('created_at', 'updated_at',) # 自動設定されるフィールドは読み取り専用に
        
        # plan フィールドは、AIによって生成されるため、クライアントからのリクエストには無いが、
        # serializerのデフォルトの挙動では必須とされバリデーションの段階でエラーを返すので、extra_kwargsで設定します。
        extra_kwargs = {
            'plan': {'required': False}
        }
        
    # create メソッドをオーバーライドして、シリアライザー経由での作成時に
    # user フィールドを自動的に設定します。
    def create(self, validated_data):
        # perform_create で user が割り当てられるため、ここでは validated_data から user を削除
        validated_data.pop('user', None)
        return TrainingPlan.objects.create(**validated_data)

    # update メソッドもオーバーライドして、user フィールドが誤って変更されないようにします。
    def update(self, instance, validated_data):
        # user フィールドは更新時には無視するか、意図的に変更させないようにする
        validated_data.pop('user', None) # user が validated_data に含まれていても無視
        return super().update(instance, validated_data)
        
class TrainingSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model =TrainingSession
        fields = ['id', 'training_plan', 'session_date', 'completed', 'notes']