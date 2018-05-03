
$(function() {
	$(".component-user-info").load("../../components/userinfo/userinfo.html");
    $(".component-attachment-button-w-eddrive").load("../../components/attachment/attachment-button-w-eddrive.html");
    $(".component-attachment-files").load("../../components/attachment/attachment-files.html");
    $(".component-conversation-modal").load("../../components/conversation/conversation-modal.html");
	
	$('.start_chat').on('keypress',function(e){
		e.stopPropagation();
		if (e.which == 124) {e.preventDefault();}

		if (e.which == 13) {
			e.preventDefault();
			var txt = $(this).val().replace(/[|]/g,"");
			if ($.trim(txt) == '') {return};
			$('.chat-dropdown li').removeClass('active');
			$('.chat-dropdown li:eq(1)').before('<li class="active"><a href="#">'+txt+'</a></li>');
			$('.media-content').trigger('click');
			$(this).val('');
		}
		
	});
	
	$('[name="message-type"]').on('change', function() {
		$('.selected-message-type').text($('[name="message-type"]:checked').parents('label').text().trim())
	});
	$('[name="history"]').on('change', function() {
		$('.selected-history').text($('[name="history"]:checked').parents('label').text().trim())
	});
	
	var $typeArea = $('');
	$(".component-attachment-button-w-eddrive").load("../../components/attachment/attachment-button-w-eddrive.html", function() {
		$typeArea = $($('.type-area:first').clone(false)).clone();
		$typeArea.find('textarea').val('');
		$typeArea.find('.textarea.content-group').remove();
	});

	$('#chats-tab').find('textarea').emojioneArea({
		pickerPosition: "bottom"
	});


	$('.contact-search').select2();

   $('.contact, #conversations').click(function(){
		$('#contacts-list').slideUp('slow');
		$('#chats-tab').show('slow');
		return false;
   });

   $('.contact-search').change(function(){
		$('#contacts-list').slideUp('slow');
		$('#chats-tab').show('slow');
		return false;
   });

   $('#contacts').click(function(){
		$('#chats-tab').slideUp('slow');
		$('#contacts-list').show('slow');
		return false;
   });


   $('.minimize-btn').on('click', function(e) {
	  e.preventDefault();
	  $(this).parents('.collapsable-panel-left').addClass('hidden');
	  $('.maximize-btn').show();
	  autocollapse();
   });

   $('.maximize-btn > button').on('click', function() {
	  $(this).parent().hide();
	  $(this).parents('.collapsable-panel-wrapper').find('.collapsable-panel-left').css('display', 'table-cell').removeClass('hidden');
	  autocollapse();
   });


   app.initSearch($('.typeahead-person'), 'person', true);

	$('#show-all').on('click',function(){
   		$('.entities-filter').hide();
	});

	$('#show-groups').on('click',function(){
	   	$('.entities-filter').hide();
	});


	$('#show-individual').on('click',function(){
	   	$('.entities-filter').show();
	});

	$('.entity-select').multiselect({});




	$('a.contact').on('click', function() {
		// Start Chat

		var imgSrc = $(this).parents('li').find('.media-left > img').attr('src');
		var name = $(this).clone()
				    .children()
				    .remove()
				    .end()
				    .text().trim().split(' ')[0];


		var nextTabId = Date.now();

	  	$('<li><a href="#tab' + nextTabId + '" data-toggle="tab" class="legitRipple">'+
			'<img src="'+imgSrc+'" alt="" class="img-circle tab-img position-left">' +
		 	name + '<span title="Online" class="badge status-icon no-padding media-badge"><i class="icon-circle2 text-success-400"></i></span>' +
			'<button type="button" class="close ml-10 text-size-xxlarge pull-right" onclick="closeChat(this);">×</button>' +
			'<span class="badge pull-right bg-orange ml-5 unread-msg">1</span>' +
			'</a></li>'
		).insertBefore('#chats-tab ul.nav-tabs > li:last');

		$('<div class="tab-pane has-padding" id="tab'+nextTabId+'"></div>').appendTo('#chats-tab .tab-content');

		var $clonedTypeArea = $($typeArea.clone(false)).clone();
		$('#tab' + nextTabId).append($clonedTypeArea);
		$clonedTypeArea.find('textarea').emojioneArea({
			pickerPosition: "bottom"
		});




		manageEmtpyMessages();
		autocollapse();


		$('a[href="#tab'+nextTabId+'"]').trigger('click');
	});


	$(document).on('click', '.collapsed-menu > li > a', function() {
		var $tabs = $(this).parents('ul.nav.nav-tabs');
		var id = $(this).parent().attr('data-id');
		$(this).parent().remove();

		$('#' + id).prependTo($tabs);
		$('#' + id).tab('show');

		autocollapse();

	});



	$(window).on('resize', function() {
		autocollapse();
	});


	$('.category-title [data-action="collapse"]').on('click', function(e) {
		e.stopImmediatePropagation();
	});


	$('[name="contact-type"]').on('change', function() {
		var value = $('[name="contact-type"]:checked').attr('id');
		if (value == 'radio-individuals') {
			$('.entities-container').show();
		} else if (value == 'radio-groups') {
			$('.entities-container').hide();
		} else {
			$('.entities-container').show();
		}

		$('.selected-contact-type').text($('[name="contact-type"]:checked').parents('label').text().trim())
	});

	$('.entities-container input[type="checkbox"]').on('click', function() {
		var selected = [];
		var len = 0;
		$('.entities-container input[type="checkbox"]').each(function(i, checkbox) {
			len++;
			if ($(checkbox).is(':checked')) {
				selected.push($(checkbox).parents('label').text().trim());
			}
		});

		if (selected.length === len) {
			$('.selected-entities').text('all');
		} else if (selected.length) {
			$('.selected-entities').text(selected.join(', '));
		} else {
			$('.selected-entities').text('nothing selected');
		}
	});

});



$(window).on('load', function() {
	autocollapse();
});


function manageEmtpyMessages() {
	var openChatsCount = $('#chats-tab').find('ul.nav-tabs').children('li').length;
	if (openChatsCount > 1) {
		$('#chats-tab > div').hide();
		$('#chats-tab > .tabbable').show();
	} else {
		var selectedTab = $('.chat-panel-tabs li.active > a').text().trim().toLowerCase();
		$('#chats-tab > div').hide();
		$('#chats-tab .' + selectedTab + '-emtpy-message').show();
	}
}



function closeChat(el) {
	if ($(el).closest('.collapsed-menu').length) {
		var id = $(el).closest('li').attr('data-id');
		$(el).closest('li').remove();
		return $('#' + id).find('button.close').trigger('click');
	}

	var $a = $(el).closest('a');
	var selected = $(el).closest('li').hasClass('active');
    $($a.attr('href')).remove();
    $a.parent().remove();

	if (selected) {
		$("#chats-tab .nav-tabs li").children('a:first').trigger('click');
	}

	manageEmtpyMessages();

	autocollapse();
}


function autocollapse() {

	var $tabs = $('#chats-tab ul.nav-tabs');
	var $collapsed = $tabs.find('.collapsed-menu');
	$collapsed.children().remove();

	var offset = 0;

	$tabs.children('li').attr('id', '');
	var _length = 0;
	$tabs.children('li').each(function(i, el) {
		if ($(el).offset().top > offset + 5 && !$(el).hasClass('dropdown')) {
			var $liCloned = $($(el).clone());
			$liCloned.attr('data-id', 'rtab_' + i);
			$liCloned.attr('id', '');
			$(el).attr('id', 'rtab_' + i);
			$collapsed.append($liCloned);
			_length++;
		}
	});

	if (_length) {
		$tabs.find('.dropdown').show();
	} else {
		$tabs.find('.dropdown').hide();
	}


};

function initFroalaEditor() {

	$('#insert_email_communication').froalaEditor({
        toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '|', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'help', 'html', '|', 'undo', 'redo', 'mergeCodeDropdown'],
        pluginsEnabled: null,
        height: 300,
        spellcheck: false,
        scaytAutoload: false,
		toolbarBottom: true,
    }).on('froalaEditor.buttons.refresh', function (e, editor) {
        $('.fr-modal-close').addClass('icon-cross2');
    });

}
