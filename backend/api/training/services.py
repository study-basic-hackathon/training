from .models import TrainingPlan
# from services.gemini_service import GeminiService

def create_training_plan(goal):

    # gemini_service = GeminiService()
    # ai_response = gemini_service.generate_training_plan(goal)

    TrainingPlan.objects.create(
        goal=goal,
        plan_name=f"{goal.name}のプラン",
        # ai_generated_content=ai_response
    )