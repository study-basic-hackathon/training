import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './PlanCreatePage.css';
import 'react-datepicker/dist/react-datepicker.css';
import ja from 'date-fns/locale/ja';
import DatePicker, { registerLocale } from 'react-datepicker';
registerLocale('ja', ja);

export default function PlanCreatePage() {
    const navigate = useNavigate();
    const [selectedDays, setSelectedDays] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);


    const days = ["月", "火", "水", "木", "金", "土", "日"];
    const exercises = ["ランニング", "ジョギング", "水泳", "なわとび", "プッシュアップ", "プランク", "HIIT", "ヨガ", "有酸素運動", "筋トレ", "クロスフィット"];

    const toggleDay = (day) => {
        setSelectedDays((prev) =>
            prev.includes(day)
                ? prev.filter((d) => d !== day)
                : [...prev, day]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 必須チェック（先にする）
        if (selectedDays.length === 0) {
            alert("少なくとも1つの曜日を選択してください。");
            return;
        }

        if (!startDate || !endDate) {
            alert("スタート日と終了日を選択してください。");
            return;
        }

        const formData = new FormData(e.target);

        const exerciseTypes = formData.getAll("exerciseTypes");
        const availableEquipment = formData.getAll("availableEquipment");
        const focusAreas = formData.getAll("focusAreas");

        const payload = {
            planName: formData.get("planName"),
            customExercise: formData.get("customExercise"),
            trainingGoal: formData.get("trainingGoal"),
            availableEquipment: availableEquipment,
            sessionLength: formData.get("sessionLength"),
            focusAreas: focusAreas,
            healthLimitations: formData.get("healthLimitations"),
            exerciseTypes: exerciseTypes,
            trainingDays: selectedDays,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
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
                <select name="trainingGoal" required className="w-full border rounded p-2">
                    <option value="">選択してください</option>
                    <option value="buildMuscle">筋肉を増やす</option>
                    <option value="loseWeight">減量する</option>
                    <option value="increaseStamina">持久力を高める</option>
                    <option value="rehab">リハビリ・回復</option>
                    <option value="generalHealth">健康維持</option>
                </select>
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
                <legend className="font-semibold text-end">1回のトレーニング時間</legend>
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
                <legend className="font-semibold text-end">週に何回トレーニングを行いますか？</legend>
                <div className="flex gap-2 flex-wrap">
                    {days.map((day) => (
                        <label key={day} className="border rounded px-3 py-1 cursor-pointer flex items-center gap-1">
                            <input
                                type="checkbox"
                                checked={selectedDays.includes(day)}
                                onChange={() => toggleDay(day)}
                                className="hidden"
                            />
                            <span className={selectedDays.includes(day)
                                ? "bg-blue-500 text-white px-2 py-1 rounded"
                                : "px-2 py-1"}>
                                {day}
                            </span>
                        </label>
                    ))}
                </div>
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
