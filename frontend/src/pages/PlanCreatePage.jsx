import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './PlanCreatePage.css';
import 'react-datepicker/dist/react-datepicker.css';
import ja from 'date-fns/locale/ja';
import DatePicker, { registerLocale } from 'react-datepicker';
registerLocale('ja', ja);

export default function PlanCreatePage() {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const exercises = ["ランニング", "ジョギング", "水泳", "なわとび", "プッシュアップ", "プランク", "HIIT", "ヨガ", "有酸素運動", "筋トレ", "クロスフィット"];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        if (!startDate || !endDate) {
            alert("スタート日と終了日を選択してください。");
            return;
        }

        if (startDate > endDate) {
            alert("終了日は開始日より後の日付を選んでください。");
            return;
        }

        const formatDate = (date) => date.toISOString().split('T')[0];

        const exerciseTypes = formData.getAll("exerciseTypes");
        const availableEquipment = formData.getAll("availableEquipment");
        const focusAreas = formData.getAll("focusAreas");

        const payload = {
            name: formData.get("planName"),
            custom_exercise: formData.get("customExercise"),
            goal: formData.get("trainingGoal"),
            available_equipment: availableEquipment.join(","),
            session_length: formData.get("sessionLength"),
            focus_areas: focusAreas.join(","),
            health_limitations: formData.get("healthLimitations"),
            exercises: exerciseTypes.join(","),
            frequency: formData.get("frequency"),
            start_date: formatDate(startDate),
            end_date: formatDate(endDate),
        };

        console.log(payload);

        try {
            const res = await fetch("/api/training/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const error = await res.text();
                alert("保存に失敗しました: " + error);
                return;
            }

            const result = await res.json();
            navigate(`/result/${result.id}`);
        } catch (error) {
            alert("通信エラー: " + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-2xl mx-auto">
            {/* プラン名 */}
            <fieldset>
                <legend className="font-semibold text-end">トレーニングプランに名前をつけましょう</legend>
                <input name="planName" required className="w-full border rounded p-2" />
            </fieldset>

            {/* 運動種類 */}
            <fieldset>
                <legend className="font-semibold text-end">どんな運動をしますか？</legend>
                <div className="flex flex-wrap gap-4">
                    {exercises.map((ex) => (
                        <label key={ex} className="w-[45%] flex items-center gap-1">
                            <input type="checkbox" name="exerciseTypes" value={ex} />
                            {ex}
                        </label>
                    ))}
                </div>
                <input
                    name="customExercise"
                    placeholder="その他（自由記入）"
                    className="w-full border rounded p-2 mt-2"
                />
            </fieldset>

            {/* 目的 */}
            <fieldset>
                <legend className="font-semibold text-end">トレーニングの目的は何ですか？</legend>
                <input name="trainingGoal" 
                    required 
                    className="w-full border rounded p-2" 
                    placeholder="例：筋肉を増やす/ 減量する / 持久力を高める / リハビリ・回復 / 健康維持など"
                />
            </fieldset>

            {/* 器具 */}
            <fieldset>
                <legend className="font-semibold text-end">使用可能な器具</legend>
                <div className="grid grid-cols-2 gap-2">
                    <label><input type="checkbox" name="availableEquipment" value="none" /> 器具なし</label>
                    <label><input type="checkbox" name="availableEquipment" value="dumbbells" /> ダンベル</label>
                    <label><input type="checkbox" name="availableEquipment" value="barbell" /> バーベル</label>
                    <label><input type="checkbox" name="availableEquipment" value="resistanceBands" /> チューブ</label>
                    <label><input type="checkbox" name="availableEquipment" value="machines" /> ジムマシン</label>
                    <label><input type="checkbox" name="availableEquipment" value="kettlebell" /> ケトルベル</label>
                </div>
            </fieldset>

            {/* 時間 */}
            <fieldset>
                <legend className="font-semibold text-end">一日のトレーニング時間</legend>
                <select name="sessionLength" className="w-full border rounded p-2">
                    <option value="">選択してください</option>
                    <option value="15">15分</option>
                    <option value="30">30分</option>
                    <option value="45">45分</option>
                    <option value="60">60分</option>
                </select>
            </fieldset>

            {/* 重点部位 */}
            <fieldset>
                <legend className="font-semibold text-end">重点部位</legend>
                <div className="grid grid-cols-2 gap-2">
                    <label><input type="checkbox" name="focusAreas" value="arms" /> 腕</label>
                    <label><input type="checkbox" name="focusAreas" value="chest" /> 胸</label>
                    <label><input type="checkbox" name="focusAreas" value="back" /> 背中</label>
                    <label><input type="checkbox" name="focusAreas" value="core" /> 腹筋</label>
                    <label><input type="checkbox" name="focusAreas" value="legs" /> 脚</label>
                    <label><input type="checkbox" name="focusAreas" value="fullBody" /> 全身</label>
                </div>
            </fieldset>

            {/* 健康上の制限 */}
            <fieldset>
                <legend className="font-semibold text-end">健康上の制限（あれば）</legend>
                <textarea
                    name="healthLimitations"
                    placeholder="例：腰痛がある、心臓に負担がかかる運動はNG など"
                    className="healthLimitations w-full border rounded p-2"
                />
            </fieldset>

            {/* トレーニング日 */}
            <fieldset>
                <legend className="font-semibold text-end">どのくらいの頻度でトレーニングを行いますか？</legend>
                <input name="frequency" 
                    required 
                    className="w-full border rounded p-2"
                    placeholder="例：週3回 / 毎日 / 月曜・水曜・金曜など"
                />
            </fieldset>

            {/* 実施期間 */}
            <fieldset>
                <legend className="font-semibold text-end">実施期間を選択してください</legend>
                <div className="datekikan flex flex-col md:flex-row md:items-center gap-4" >
                    <div className="flex-1">
                        <label className="start-date-label block mb-1">スタート日</label>
                        <DatePicker
                            locale="ja"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="yyyy年MM月dd日"
                            className="w-full border rounded p-2"
                            popperPlacement="bottom"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="end-date-label block mb-1">終了日</label>
                        <DatePicker
                            locale="ja"
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            dateFormat="yyyy年MM月dd日"
                            className="w-full border rounded p-2"
                            popperPlacement="bottom"
                        />
                    </div>
                </div>
            </fieldset>

            {/* 送信ボタン */}
            <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                作成
            </button>
        </form>
    );
}
