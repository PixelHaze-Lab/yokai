$(function() {
    // ページロード時に画像がふわっと現れるアニメーション
    // ヤマタノオロチ
    $('#main_yokai1_img').delay(500).queue(function(next) {
        $(this).addClass('appear');
        next();
    });

    // アマビエ
    $('#main_yokai2_img').delay(800).queue(function(next) {
        $(this).addClass('appear');
        next();
    });
});