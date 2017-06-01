<script>

// const API_BASE_URL = 'http://{{ request.get_host }}/api/grabaciones/';
const API_BASE_URL = 'http://www.parcan.es/api/grabaciones/';
const START_TIME = as_seconds('{{ grabacion.hora_inicio }}');
const ID_GRABACION = {{ grabacion.id_grabacion }};
const STATE_PAUSE = 0;
const STATE_PLAYING = 1;

var player = {{ player.as_javascript }};

var data = {
    counter: 0,    /* current position of player, in secs */
    label: '',     /* time position of player, in HH:MM:SS */
    _interval: 0,
    items: [],
    state: STATE_PAUSE,
    title: '{{ jornada.descripcion }}',
    first_time: true
    }

var vm = new Vue({
    el: '#app',
    data: data,
    delimiters: ['[[', ']]'],

    created: function () {
        console.log('Vue init starts');
        this.counter = get_initial_offset();
        this.first_time = true,
        this._interval = setInterval(this.tick, 1000);
        this.prepare_offsets();
        window.player.on('play', this.on_play);
        window.player.on('pause', this.on_pause);
        console.log('Vue init ends');
        },

    methods: {

        prepare_offsets: function () {
            console.log('prepare_offsets starts');
            var url = API_BASE_URL + 'actividad.py?id_grabacion=' + ID_GRABACION;
            jQuery.getJSON(url, this.prepare_offsets_cb);
            console.log('prepare_offsets ends');
            },

        prepare_offsets_cb: function(response) {
            console.log('prepare_offsets_cb starts');
            var s_hora_inicio = as_seconds('{{ grabacion.hora_inicio}}');
            for (var i=0; i<response.result.length; i++) {
                var c = response.result[i];
                var hora = fecha_to_hhmmss(c.fecha);
                c['hora'] = hora;
                c['offset'] = as_seconds(hora) - s_hora_inicio;
                this.items.push(c);
                }
            console.log('prepare_offsets_cb ends');
            },

        go_to: function(index) {
            console.log('method go_to starts');
            var item = this.items[index];
            window.player.seek(item.offset);
            console.log('method go_to ends');
            },

        is_current: function ( index ) {
            current_index = get_sorted_index(this.items, this.counter);
            return index === current_index || current_index === this.items.lenght;
            },

        play_or_pause: function () {
            if (this.state) this.play(); else this.pause();
            },

        play: function () { window.player.play(); },

        on_play: function (state) {
            if (this.first_time) {
                window.player.seek(this.counter);
                this.first_time = false;
                }
            this.state = STATE_PLAYING;
            this._interval = setInterval(this.tick, 1000);
            },

        pause: function () { window.player.pause(); },

        on_pause: function (state) {
            this.state = STATE_PAUSE;
            clearInterval(this._interval);
            window.location.hash = '#' + this.counter;
            this.prepare_share_urls();
            },

        get_canonical_url: function () {
            const base = 'http://parcan.es/video/grabacion/'
            return base + ID_GRABACION + '#' + this.counter;
            },

        prepare_share_urls: function () {
            var url = this.get_canonical_url();
            var sharevideo = jQuery('#sharevideo');
            var url_share_twitter = 'https://twitter.com/intent/tweet?text=' +
                encodeURIComponent(
                    url + ' ' + this.title + ' ' + this.label
                    );
            jQuery('#share-twitter', sharevideo).attr('href', url_share_twitter);
            var url_share_gplus = 'https://plus.google.com/share?url=' + url;
            jQuery('#share-gplus', sharevideo).attr('href', url_share_gplus);
            var url_share_facebook = 'https://www.facebook.com/sharer.php?u=' + url;
            jQuery('#share-facebook', sharevideo).attr('href', url_share_facebook);
            },

        tick: function () {
            if (this.state === STATE_PLAYING) {
                this.counter = Math.round(window.player.getPosition());
                var date = new Date(null);
                date.setSeconds(START_TIME + this.counter); // specify value for SECONDS here
                this.label = date.toISOString().substr(11, 8);
                }
            }
        }
    });

</script>
