
(function($) {

    $.fn.gallery = function(params) {

        var _gallery = this;

        var _ratio_width = .75;
        var _slideInterval;

        var _current = 1;
        var _total_height = _total_width = $(this).width();
        var _list_item_height = 100;

        var _list = $('.gallery-item', this);
        var _total_item = _list.length;

        $(_gallery).empty();

        var _viewer_width = Math.round(_total_height * .75);


        _total_cnt = _list.length;

        //list.css('display', 'none');
        $(this).append('<div class="__gallery-main"><div class="__gallery-viewer"></div><div class="__gallery-list-wrapper"><div class="__gallery-list"></div></div></div>')
        var _gallery_main = $('.__gallery-main');
        var _gallery_viewer = $('.__gallery-viewer');
        var _gallery_list_wrapper = $('.__gallery-list-wrapper');
        var _gallery_list = $('.__gallery-list');

        if( params['slide'] == true ) {
            _slideInterval = setInterval(function () {
                slide();
            }, 3000);
        }

        $(_gallery_list_wrapper).hover(
            function(){
                console.log('Mouse Over!');
                clearInterval(_slideInterval);
            },
            function(){
                console.log('Mouse Out!');
                _slideInterval = setInterval(function () {
                    slide();
                }, 3000);
            }
        );


        $.each($(_list), function(idx, item){
            console.log($(item).data('title'));
            $(this).addClass('__gallery-item');
            $(this).addClass('__gallery-item-' + (idx + 1));

            if( idx == 0){
                //첫번째 이미지가 로드 되었는지 확인한다.
                //첫번째 이미지가 로드 되지 않았을 때를 고려하여 모든 이미지가 다 로딩되었을 때 사이즈를 계산해야 할지?? 고민.
                var firstImg = $('img', this);
                if($(firstImg).prop('complete') && $(firstImg).prop('naturalWidth') > 0){
                    console.log("IMG1 already loaded.");
                    console.log('Init Size.');
                    gallery_size_fix();
                }else {
                    $('img', this).on('load', function () {
                        console.log("IMG1 loaded.");
                        console.log('Init Size.');
                        gallery_size_fix();
                    });
                }

                $(_gallery_viewer).append( this );

            }else{
                $(this).css('height', _list_item_height + 'px');
                $(_gallery_list).append( this );
            }
        });

        $(_gallery_list_wrapper).css('height', $(_gallery_viewer).height());

        function gallery_size_fix(){
            //첫번째 큰 이미지의 크기를 기준으로 한다.
            var _org_width = $('img', $(_list[0])).prop('naturalWidth');
            var _org_height = $('img', $(_list[0])).prop('naturalHeight');

            $(_gallery_viewer).width($(_gallery).width() * _ratio_width);

            var viewer_height = Math.round(_org_height * $(_gallery_viewer).width() / _org_width);

            $(_gallery_main).height(viewer_height);
            $(_gallery_viewer).height(viewer_height);

            $(_gallery_list_wrapper).width($(_gallery).width() * (1 - _ratio_width));

            _list_item_height = Math.round($(_gallery_viewer).height() / 3)

        }

        function slide(){
            _current++;

            var tmp = _current;

            var item1 = $('.gallery-item:nth(0)').clone();
            var item2 = $('.gallery-item:nth(1)').clone();

            //$(_gallery_item_title).html($(item2).data('title'));
            $(_gallery_viewer).empty();
            $(_gallery_viewer).append(item2);
            $(_gallery_list).append(item1);
            $(item1).css('height', _list_item_height + 'px');

            $(item2).css('display', 'none');
            $(item2).fadeIn(1000);

            $(_gallery_list).animate({
                top: "-=" + _list_item_height
            }, 1000, function() {
                $(_gallery_list).children().first().remove();
                $(_gallery_list).css('top', '+='+_list_item_height);
            });


        }


        // For chaining
        return this;
    };

})(jQuery);