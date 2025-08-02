$(function() {
    const $intro = $('body.intro');

    if ($intro.length) {
        const $h1 = $intro.find('h1');

        if ($h1.length) {
            const chars = $h1.text().split('');

            $h1.html(chars.map(char => {
                const freq = (Math.random() * (2 - 1) + 1).toFixed(2);
                return `<span class="flicker" data-frequency="${freq}">${char}</span>`;
            }).join(''));

            $h1.find('.flicker').each(function() {
                const freq = parseFloat($(this).attr('data-frequency'));
                $(this).css('animation-duration', `${1.5 * freq}s`);
                $(this).attr('data-letter', $(this).text());
            });
        }
    }
});