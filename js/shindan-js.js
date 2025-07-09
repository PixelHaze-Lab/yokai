$(function () {
    // 診断の合計点数を格納する変数
    var totalScore = 0;

    // 各data-valueに割り当てる点数を定義
    var scoreMap = {
    // 質問1 (性別)
    "q1_a": 2, // 男です
    "q1_b": 15, // 女です

    // 質問2 (旅行に行くならどこ)
    "q2_a": 1,  // 暑い地域
    "q2_b": 3,  // 寒い地域
    "q2_c": 25,  // 目黒

    // 質問3 (頭脳タイプ)
    "q3_d": 1,  // 右脳派
    "q3_e": 5,  // 左脳派

    // 質問4 (お化けに出会った！)
    "q4_f": 1,  // 逃げる
    "q4_g": 4,  // 気絶する
    "q4_h": 12  // スマホで撮影する
};

    // --- ボタンを押すごとに画面が切り替わり、点数をカウントする関数 ---
    // 全ての.btnクリック処理をこの1箇所に集約します。
    $(".btn").on("click", function () {
        // 現在の質問を非表示にする
        // closest("div[id^='q_']")は、より正確に質問div要素を指定します。
        $(this).closest("div[id^='q_']").css("display", "none");

        // クリックされたボタンのdata-valueを取得
        var value = $(this).data("value");

        // data-valueに対応する点数をtotalScoreに加算
        totalScore += scoreMap[value] || 0; // scoreMapにない場合は0点を加算

        // 次の質問のIDを取得 (href属性から)
        var nextQuestionId = $(this).attr("href");

        // もし最後の質問のボタン（class="end"が付いている）がクリックされた場合
        if ($(this).hasClass('end')) {
            // 全ての質問要素を非表示にする（念のため、結果表示前に不要な要素を隠す）
            $('div[id^="q_"]').hide();
            // 結果表示関数を呼び出す
            displayResult(totalScore);
        } else {
            // 次の質問を表示する
            // 最初の質問 (q_01) にだけ 'fit' クラスが付いている想定であれば、
            // 次の質問に 'fit' を追加する必要はありません。
            // 必要であれば追加してください。
            $(nextQuestionId).fadeIn("slow").show();
        }
    });

    // --- 診断結果を出力する関数 ---
    function displayResult(score) {
        var resultId;

        // あなたのHTMLのdata-valueとscoreMapの定義により、
        // 合計スコアの範囲は最小4点（1+1+1+1）から最大20点（5+5+5+5）です。
        // この17段階のスコアで25個の異なる結果を厳密に分岐させるには、
        // スコアリングのロジックをさらに工夫する必要があります。
        // 例えば、特定のスコアに複数の結果を割り当てる、または特定の回答パターンを考慮する、などです。

        // 以下は、スコアの範囲で可能な限り25個の結果に割り当てる例ですが、
        // 厳密なユニーク性や均等な配分を保証するものではありません。
        // 診断のロジックに合わせて、これらの閾値を細かく調整してください。

        if (score >= 5 && score <= 6)resultId = '#answer_01';
        else if (score === 8) resultId = '#answer_02';
        else if (score === 16) resultId = '#answer_03';
        else if (score === 9) resultId = '#answer_04';
        else if (score >= 12 && score <= 13) resultId = '#answer_05';
        else if (score === 20) resultId = '#answer_06';
        else if (score === 7) resultId = '#answer_07';
        else if (score === 10) resultId = '#answer_08';
        else if (score === 18) resultId = '#answer_09';
        else if (score === 11) resultId = '#answer_10';
        else if (score >= 14 && score <= 15) resultId = '#answer_11';
        else if (score === 22) resultId = '#answer_12';
        else if (score >= 17 && score <= 18) resultId = '#answer_13';
        else if (score === 21) resultId = '#answer_14';
        else if (score >= 29 && score <= 30) resultId = '#answer_15';
        else if (score === 19) resultId = '#answer_16';
        else if (score >= 25 && score <= 26) resultId = '#answer_17';
         else if (score >= 33 && score <= 34) resultId = '#answer_18';
          else if (score === 20) resultId = '#answer_19';
           else if (score === 23) resultId = '#answer_20';
            else if (score >= 31 && score <= 32) resultId = '#answer_21';
            else if (score === 24) resultId = '#answer_22';
           else if (score >= 27 && score <= 28) resultId = '#answer_23';
            else if (score === 35) resultId = '#answer_24';
            else if (score >= 40 && score <= 100) resultId = '#answer_25';


        // ここから先は、スコアのユニークな値が尽きているため、
        // 同じスコアに対して複数の結果を割り当てるか、
        // 特定のスコア範囲で複数の結果をランダムに選ぶなどのロジックが必要になります。
        // または、特定の回答の組み合わせ（例：質問1がAで質問2がBの場合）を考慮して分岐を増やす、
        // といったより複雑な条件分岐を追加する必要があります。
        // 以下は、便宜的に残りの結果IDを割り当てた例です。
        // 実際の診断結果のバランスを考えて調整してください。
        else if (score >= 15 && score < 17) resultId = '#answer_18'; // 例: 15-16点の範囲に割り当て
        else if (score >= 17 && score < 19) resultId = '#answer_19'; // 例: 17-18点の範囲に割り当て
        else if (score >= 19 && score <= 20) resultId = '#answer_20'; // 例: 19-20点の範囲に割り当て
        else resultId = '#answer_25'; // その他のスコアまたはデフォルト

        // 上記のロジックではまだ25個を全て埋められない可能性が高いです。
        // 25個の結果を正確に分岐させるには、点数配分をより細かくするか、
        // 質問数を増やすことを再度ご検討ください。

        // 該当する結果をフェードインで表示
        $(resultId).fadeIn("slow").show();
    }
});