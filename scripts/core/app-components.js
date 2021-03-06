/* ------------------------------------------------------------------------------
 *
 *  # Template JS core
 *
 *  Core JS file with default functionality configuration
 *
 *  Version: 1.2
 *  Latest update: Dec 11, 2015
 *
 * ---------------------------------------------------------------------------- */
"use strict";


var app = {

	FROALA_ACTIVATION_KEY : '3Xa1TEWUf1d1QSDb1HAc1==',

    adjustTableColumns: function() {
        if ($.fn.dataTable != null) {
            $.fn.dataTable.tables({visible: true, api: true}).columns.adjust();

        }
    },


    // Calculate min height
    containerHeight: function() {
        // var availableHeight = $(window).height() - $('.page-container').offset().top - $('.navbar-fixed-bottom').outerHeight();
        // $('.page-container').attr('style', 'min-height:' + availableHeight + 'px');
    },

    setWrapperSize: function() {
        if ($('.nav-tabs-vertical .dataTables_wrapper').length) {
            $('.nav-tabs-vertical .dataTables_wrapper').each(function () {
                var screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                if (screenWidth > 768) {
                    var w = $('.panel-default').width() - 240;
                    $(this).width(w);

                } else {
                    $(this).width('100%');
                }
            });
        }

    	if ($('.nav-tabs-vertical .table-responsive-always').length) {
            $('.nav-tabs-vertical .table-responsive-always').each(function () {
                var screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                if (screenWidth > 768) {
                    $(this).width($('.panel-default').width() - 240);
                } else {
                    $(this).width('100%');
                }
            });
        }

        if ($('.nav-tabs-vertical .chart-container').length) {
            $('.nav-tabs-vertical .chart-container').each(function () {
                if ($(window).width() > 752) {
                    $(this).width('100%');
                } else {
                    $(this).width('100%');
                }
            });
        }
    },

    initHeadingElements: function() {
        $('.panel-footer').has('> .heading-elements:not(.not-collapsible)').prepend('<a class="heading-elements-toggle"><i class="icon-more"></i></a>');
        $('.page-title, .panel-title').parent().has('> .heading-elements:not(.not-collapsible)').children('.page-title, .panel-title').append('<a class="heading-elements-toggle"><i class="icon-more"></i></a>');
        // Toggle visible state of heading elements
        $('.page-title .heading-elements-toggle, .panel-title .heading-elements-toggle').on('click', function() {
            $(this).parent().parent().toggleClass('has-visible-elements').children('.heading-elements').toggleClass('visible-elements');
        });
        $('.panel-footer .heading-elements-toggle').on('click', function() {
            $(this).parent().toggleClass('has-visible-elements').children('.heading-elements').toggleClass('visible-elements');
        });
    },


    initBreadCrumb: function() {
        $('.breadcrumb-line').has('.breadcrumb-elements').prepend('<a class="breadcrumb-elements-toggle"><i class="icon-menu-open"></i></a>');

        $('.breadcrumb-elements-toggle').on('click', function() {
            $(this).parent().children('.breadcrumb-elements').toggleClass('visible-elements');
        });
    },

    initNavbar: function() {
        // Prevent dropdown from closing on click
        $(document).on('click', '.dropdown-content', function (e) {
            e.stopPropagation();
        });

        // Disabled links
        $('.navbar-nav .disabled a').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });

        // Show tabs inside dropdowns
        $('.dropdown-content a[data-toggle="tab"]').on('click', function (e) {
            $(this).tab('show');
        });
    },


    initDrillDown: function() {
        // If menu has child levels, add selector class
        $('.menu-list').find('li').has('ul').parents('.menu-list').addClass('has-children');

        // Attach drill down menu to menu list with child levels
        $('.has-children').dcDrilldown({
            defaultText: 'Back to parent',
            saveState: true
        });
    },


    initPanels: function() {
        var self = this;
        // Panels
        $('.panel [data-action=reload]').click(function (e) {
            e.preventDefault();
            var block = $(this).parent().parent().parent().parent().parent();
            $(block).block({
                message: '<i class="icon-spinner2 spinner"></i>',
                overlayCSS: {
                    backgroundColor: '#fff',
                    opacity: 0.8,
                    cursor: 'wait',
                    'box-shadow': '0 0 0 1px #ddd'
                },
                css: {
                    border: 0,
                    padding: 0,
                    backgroundColor: 'none'
                }
            });

            // For demo purposes
            window.setTimeout(function () {
                $(block).unblock();
            }, 2000);
        });


        // Sidebar categories
        $('.category-title [data-action=reload]').click(function (e) {
            e.preventDefault();
            var block = $(this).parent().parent().parent().parent();
            $(block).block({
                message: '<i class="icon-spinner2 spinner"></i>',
                overlayCSS: {
                    backgroundColor: '#000',
                    opacity: 0.5,
                    cursor: 'wait',
                    'box-shadow': '0 0 0 1px #000'
                },
                css: {
                    border: 0,
                    padding: 0,
                    backgroundColor: 'none',
                    color: '#fff'
                }
            });

            // For demo purposes
            window.setTimeout(function () {
                $(block).unblock();
            }, 2000);
        });


        // Light sidebar categories
        $('.sidebar-default .category-title [data-action=reload]').click(function (e) {
            e.preventDefault();
            var block = $(this).parent().parent().parent().parent();
            $(block).block({
                message: '<i class="icon-spinner2 spinner"></i>',
                overlayCSS: {
                    backgroundColor: '#fff',
                    opacity: 0.8,
                    cursor: 'wait',
                    'box-shadow': '0 0 0 1px #ddd'
                },
                css: {
                    border: 0,
                    padding: 0,
                    backgroundColor: 'none'
                }
            });

            // For demo purposes
            window.setTimeout(function () {
                $(block).unblock();
            }, 2000);
        });

        // Hide if collapsed by default
        $('.category-collapsed').children('.category-content').hide();


        // Rotate icon if collapsed by default
        $('.category-collapsed').find('[data-action=collapse]').addClass('rotate-180');


        // Collapse on click
        $('.category-title [data-action=collapse]').click(function (e) {
            e.preventDefault();
            var $categoryCollapse = $(this).parent().parent().parent().nextAll();
            $(this).parents('.category-title').toggleClass('category-collapsed');
            $(this).toggleClass('rotate-180');

            self.containerHeight(); // adjust page height

            $categoryCollapse.slideToggle(150);
        });

        // Hide if collapsed by default
        $('.panel-collapsed').children('.panel-heading').nextAll().hide();


        // Rotate icon if collapsed by default
        $('.panel-collapsed').find('[data-action=collapse]').addClass('rotate-180');


        // Collapse on click
        $(document).on('click', '.panel [data-action=collapse]',function (e) {
            e.preventDefault();
            var $panelCollapse = $(this).parent().parent().parent().parent().nextAll();
            $(this).parents('.panel').toggleClass('panel-collapsed');
            $(this).toggleClass('rotate-180');

            self.containerHeight(); // recalculate page height

            $panelCollapse.slideToggle(150);
        });

        // Panels
        $('.panel [data-action=close]').click(function (e) {
            e.preventDefault();
            var $panelClose = $(this).parent().parent().parent().parent().parent();

            self.containerHeight(); // recalculate page height

            $panelClose.slideUp(150, function () {
                $(this).remove();
            });
        });


        // Sidebar categories
        $('.category-title [data-action=close]').click(function (e) {
            e.preventDefault();
            var $categoryClose = $(this).parent().parent().parent().parent();

            self.containerHeight(); // recalculate page height

            $categoryClose.slideUp(150, function () {
                $(this).remove();
            });
        });

        if (!$('body').hasClass('index')) {
            $('.category-content').hide();
            $('.sidebar-category.module-filter').hide();
        }
    },

    initHeaderComponent: function() {
        $(".component-header").load("../components/header/header.html", function() {

    		var headerNavClass = $('body').attr("class").split(" ").filter(getLeftNavClass);


    		function getLeftNavClass(value) {
    			return value.indexOf("module") > -1;
    		}

    		if(headerNavClass != ''){
    			var module_name = headerNavClass[0].replace('module-','');
    			$("[data-module='" + module_name + "']").addClass('active').parents('ul').parent().addClass('active');
    		}


    		// Ripple effect
    		$(".btn:not(.disabled):not(.multiselect.btn-default):not(.bootstrap-select .btn-default), .navigation li:not(.disabled) a, .nav > li:not(.disabled) > a, .nav > li:not(.disabled) > .checkbox, .sidebar-user-material-menu > a, .sidebar-user-material-content > a, .select2-selection--single[class*=bg-], .breadcrumb-elements > li:not(.disabled) > a, .wizard > .actions a, .ui-button:not(.ui-dialog-titlebar-close), .ui-tabs-anchor:not(.ui-state-disabled), .plupload_button:not(.plupload_disabled), .fc-button, .pagination > li:not(.disabled) > a, .pagination > li:not(.disabled) > span, .pager > li:not(.disabled) > a, .pager > li:not(.disabled) > span").ripple({
    			dragging: false,
    			adaptPos: false,
    			scaleMode: false
    		});

    		// Unbind ripple in Datepaginator
    		$('.dp-item, .dp-nav, .sidebar-xs .sidebar-main .navigation > li > a').ripple({unbind: true});

    		$(document).on('click', '.sidebar-control', function() {
    			if($('body').hasClass('sidebar-xs')) {
    				$('.sidebar-main .navigation > li > a').ripple({unbind: true});
    			}
    			else {
    				$('.sidebar-main .navigation > li > a').ripple({unbind: false});
    			}
    		});


    	});
    },


    initLeftNavComponent: function() {
        var self = this;



    		var leftNavClass = $('body').attr("class").split(" ").filter(getLeftNavClass);

    		function getLeftNavClass(value) {
    			return value.indexOf("left-nav") > -1;
    		}

    		if(leftNavClass != ''){
    			var page_name = leftNavClass[0].replace('left-nav-','');

    			$("[data-left-nav='" + page_name + "']").addClass('active');

    		}

    		// Add 'active' class to parent list item in all levels
    		$('.navigation').find('li.active').parents('li').addClass('active');

    		// Hide all nested lists
    		$('.navigation').find('li').not('.active, .category-title').has('ul').children('ul').addClass('hidden-ul');

    		// Highlight children links
    		$('.navigation').find('li').has('ul').children('a').addClass('has-ul');

    		// Add active state to all dropdown parent levels
    		$('.dropdown-menu:not(.dropdown-content), .dropdown-menu:not(.dropdown-content) .dropdown-submenu').has('li.active').addClass('active').parents('.navbar-nav .dropdown:not(.language-switch), .navbar-nav .dropup:not(.language-switch)').addClass('active');



    		// Main navigation tooltips positioning
    		// -------------------------

    		// Left sidebar
    		$('.navigation-main > .navigation-header > i').tooltip({
    			placement: 'right',
    			container: 'body'
    		});



    		// Collapsible functionality
    		// -------------------------

    		// Main navigation
    		$('.navigation-main').find('li').has('ul').children('a').on('click', function (e) {
    			e.preventDefault();

    			// Collapsible
    			$(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).toggleClass('active').children('ul').slideToggle(250);

    			// Accordion
    			if ($('.navigation-main').hasClass('navigation-accordion')) {
    				$(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).siblings(':has(.has-ul)').removeClass('active').children('ul').slideUp(250);
    			}
    		});


    		// Alternate navigation
    		$('.navigation-alt').find('li').has('ul').children('a').on('click', function (e) {
    			e.preventDefault();

    			// Collapsible
    			$(this).parent('li').not('.disabled').toggleClass('active').children('ul').slideToggle(200);

    			// Accordion
    			if ($('.navigation-alt').hasClass('navigation-accordion')) {
    				$(this).parent('li').not('.disabled').siblings(':has(.has-ul)').removeClass('active').children('ul').slideUp(200);
    			}
    		});

            // Toggle mini sidebar
            $('.sidebar-main-toggle').on('click', function (e) {
                e.preventDefault();

                // Toggle min sidebar class
                $('body').toggleClass('sidebar-xs');
            });

    		// Disable click in disabled navigation items
    		$(document).on('click', '.navigation .disabled a', function (e) {
    			e.preventDefault();
    		});


    		// Hide if collapsed by default
    		$('.category-collapsed').children('.category-content').hide();

    		// Rotate icon if collapsed by default
    		$('.category-collapsed').find('[data-action=collapse]').addClass('rotate-180');

            // Hide main sidebar in Dual Sidebar
            $(document).on('click', '.sidebar-main-hide', function (e) {
                e.preventDefault();
                $('body').toggleClass('sidebar-main-hidden');
            });


            // Toggle second sidebar in Dual Sidebar
            $(document).on('click', '.sidebar-secondary-hide', function (e) {
                e.preventDefault();
                $('body').toggleClass('sidebar-secondary-hidden');
            });


            // Hide all sidebars
            $(document).on('click', '.sidebar-all-hide', function (e) {
                e.preventDefault();
                $('body').toggleClass('sidebar-all-hidden');
            });


            // Collapse main sidebar if opposite sidebar is visible
            $(document).on('click', '.sidebar-opposite-toggle', function (e) {
                e.preventDefault();

                // Opposite sidebar visibility
                $('body').toggleClass('sidebar-opposite-visible');

                // If visible
                if ($('body').hasClass('sidebar-opposite-visible')) {

                    // Make main sidebar mini
                    $('body').addClass('sidebar-xs');

                    // Hide children lists
                    $('.navigation-main').children('li').children('ul').css('display', '');
                }
                else {

                    // Make main sidebar default
                    $('body').removeClass('sidebar-xs');
                }
            });


            // Hide main sidebar if opposite sidebar is shown
            $(document).on('click', '.sidebar-opposite-main-hide', function (e) {
                e.preventDefault();

                // Opposite sidebar visibility
                $('body').toggleClass('sidebar-opposite-visible');

                // If visible
                if ($('body').hasClass('sidebar-opposite-visible')) {

                    // Hide main sidebar
                    $('body').addClass('sidebar-main-hidden');
                }
                else {

                    // Show main sidebar
                    $('body').removeClass('sidebar-main-hidden');
                }
            });

            // Hide secondary sidebar if opposite sidebar is shown
            $(document).on('click', '.sidebar-opposite-secondary-hide', function (e) {
                e.preventDefault();

                // Opposite sidebar visibility
                $('body').toggleClass('sidebar-opposite-visible');

                // If visible
                if ($('body').hasClass('sidebar-opposite-visible')) {

                    // Hide secondary
                    $('body').addClass('sidebar-secondary-hidden');

                }
                else {

                    // Show secondary
                    $('body').removeClass('sidebar-secondary-hidden');
                }
            });


            // Hide all sidebars if opposite sidebar is shown
            $(document).on('click', '.sidebar-opposite-hide', function (e) {
                e.preventDefault();

                // Toggle sidebars visibility
                $('body').toggleClass('sidebar-all-hidden');

                // If hidden
                if ($('body').hasClass('sidebar-all-hidden')) {

                    // Show opposite
                    $('body').addClass('sidebar-opposite-visible');

                    // Hide children lists
                    $('.navigation-main').children('li').children('ul').css('display', '');
                }
                else {

                    // Hide opposite
                    $('body').removeClass('sidebar-opposite-visible');
                }
            });


            // Keep the width of the main sidebar if opposite sidebar is visible
            $(document).on('click', '.sidebar-opposite-fix', function (e) {
                e.preventDefault();

                // Toggle opposite sidebar visibility
                $('body').toggleClass('sidebar-opposite-visible');
            });


            // Collapse on click
    		$('.category-title [data-action=collapse]').click(function (e) {
    			e.preventDefault();
    			var $categoryCollapse = $(this).parent().parent().parent().nextAll();
    			$(this).parents('.category-title').toggleClass('category-collapsed');
    			$(this).toggleClass('rotate-180');

    			self.containerHeight(); // adjust page height

    			$categoryCollapse.slideToggle(150);
    		});


    		// Collapse on click
    		$('.category-title > span').click(function (e) {
    			e.preventDefault();
                if ($(e.target).hasClass('prevent-default')) {
                    return;
                }
    			var $categoryCollapse = $(this).parent().find('[data-action=collapse]').parent().parent().parent().nextAll();
    			$(this).parent().find('[data-action=collapse]').parents('.category-title').toggleClass('category-collapsed');
    			$(this).parent().find('[data-action=collapse]').toggleClass('rotate-180');

    			self.containerHeight(); // adjust page height

    			$categoryCollapse.slideToggle(150);
    		});


    },


    initFooterComponent: function() {
    	$(".component-footer").load("../components/footer/footer.html");
    },

    initChatComponent: function() {
        var $messenger;
        $(document).on('click', '.chat-contacts a', function(event, data) {
            event.preventDefault();
            var person = $(this).find('.media-heading').text().trim();

            if ($('.contact-name').text().indexOf(person) !== -1) {
                return;
            }

            if (!$messenger) {
                $messenger = $('.messenger-wrapper:first').clone(true);
            }
            var timestampt = Date.now();
            $messenger.attr('id', 'cw-' + timestampt);
            if (!data) {
                $('.chat-window.contacts').find('.panel-title a').trigger('click');
            }

            var $newWindow = $messenger.clone(true);
            if ($('.active-chats-wrapper:visible').length) {
                $('.messenger-wrapper').attr('style', '');
                $newWindow.attr('style', 'display: table-cell !important');
            }
            $newWindow.find('.chat-window').removeClass('hidden');
            $newWindow.find('.contact-name').text(person).parent();


            $('.chat-container').append($newWindow);

            var $li = $('<li id="cl-' + timestampt + '"><a href="#">Chat with ' + person + '</a></li>');
            $('.active-chats-dropdown').prepend($li);
            $('.active-chats-dropdown').find('li.placeholder').hide();


        });

        $(document).on('click', '.chat-window a[data-action="close-messenger"]', function(event) {
            event.preventDefault();
            var id = $(this).parents('.messenger-wrapper').remove().attr('id');
            $('.active-chats-dropdown').find('li#cl-' + id.split('-')[1]).remove();
            if ($('.active-chats-dropdown').find('li').length == 1) {
                $('.active-chats-dropdown').find('li.placeholder').show();
            }
        });

        $(document).on('click', '.active-chats-dropdown > li > a', function(event) {
            event.preventDefault();
            if ($(this).parent().hasClass('placeholder')) {
                return;
            }
            var id = $(this).parent().attr('id').split('-')[1];
            $('.messenger-wrapper').attr('style', '');
            $('#cw-' + id).attr('style', 'display: table-cell !important');
        });

        $(document).on('click', '.chat-window .heading-elements a[data-action="collapse"]', function(event, data) {
            if (data) {
                return;
            }

            if ($('.active-chats-wrapper:hidden').length) {
                return;
            }

            if ($(this).parents('.messenger-wrapper').length) { //CHAT
                if (!$(this).hasClass('rotate-180')) {
                    $('.messenger-wrapper .heading-elements').find('a[data-action="collapse"]:not(.rotate-180)').not(this).trigger('click', [{data: true}]);

                    $('.contacts-wrapper .heading-elements').find('a.rotate-180[data-action="collapse"]').not(this).trigger('click', [{data: true}]);
                } else {
                    $(this).parents('.messenger-wrapper').attr('style', '');
                }
            } else {
                if ($(this).hasClass('rotate-180')) { //CONTACTS
                    $('.messenger-wrapper .heading-elements').find('a[data-action="collapse"]:not(.rotate-180)').not(this).trigger('click', [{data: true}]);
                    $('.contacts-wrapper .heading-elements').find('a.rotate-180[data-action="collapse"]').not(this).trigger('click', [{data: true}]);

                }
            }
        });


        // Chat Window
        $(document).on('keyup', 'input.new-chat-search', function() {
            var value = $(this).val();
            if (value) {
                $('.chat-contacts li').addClass('hidden');
                $('.chat-contacts li').each(function(i, li) {
                    if ($(li).find('.media-heading').text().toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                        $(li).removeClass('hidden');
                    }
                });
            } else {
                $('.chat-contacts li').removeClass('hidden');
            }
        });


        $(document).on('change keyup','.person-search input.token-input.tt-input', function() {
            if ($(this).val()) {
                $(this).parents('.person-search').children('label.control-label').addClass('is-visible');
            } else {
                $(this).parents('.person-search').children('label.control-label').removeClass('is-visible');
            }

        }).trigger('change');
    },


    initMobileSidebar: function() {
        // Toggle main sidebar
        $('.sidebar-mobile-main-toggle').on('click', function (e) {
            e.preventDefault();
            $('body').toggleClass('sidebar-mobile-main').removeClass('sidebar-mobile-secondary sidebar-mobile-opposite');
        });

        // Toggle secondary sidebar
        $('.sidebar-mobile-secondary-toggle').on('click', function (e) {
            e.preventDefault();
            $('body').toggleClass('sidebar-mobile-secondary').removeClass('sidebar-mobile-main sidebar-mobile-opposite');
        });

        // Toggle opposite sidebar
        $('.sidebar-mobile-opposite-toggle').on('click', function (e) {
            e.preventDefault();
            $('body').toggleClass('sidebar-mobile-opposite').removeClass('sidebar-mobile-main sidebar-mobile-secondary');
        });
    },


    reDrawChatWindows: function() {
        //CHAT WINDOW RESPONSIVE FIX
        var height = $(window).height();
        if (height < 600) {
            if (height < 420) {
                $('.chat-container .chat-list').css('max-height', (height / 3.5));
            } else {
                $('.chat-container .chat-list').css('max-height', (height / 2));
            }

        } else {
            //DEFAULT:
            $('.chat-container .chat-list').css('max-height', '300px');
        }
    },

    onWindowScroll: function() {
        $('table:not(.has-fluid-dropdown) .dropdown .dropdown-menu').parent().removeClass('open');
        $('.select-dropdown .btn-group').removeClass('open');
    },


    onWindowResize: function() {
        var self = this;
        self.setWrapperSize();
        self.adjustTableColumns();

        $('table:not(.has-fluid-dropdown) .dropdown .dropdown-menu').parent().removeClass('open');
        $('.select-dropdown .btn-group').removeClass('open');

        self.reDrawChatWindows();

        setTimeout(function () {
            self.containerHeight();

            if ($(window).width() <= 768) {

                // Add mini sidebar indicator
                $('body').addClass('sidebar-xs-indicator');

                // Place right sidebar before content
                $('.sidebar-opposite').prependTo('.page-content');

                // Remove nicescroll on mobiles
                $('.menu-list').getNiceScroll().remove();
                $(".menu-list").removeAttr('style').removeAttr('tabindex');

                // Add mouse events for dropdown submenus
                $('.dropdown-submenu').on('mouseenter', function() {
                    $(this).children('.dropdown-menu').addClass('show');
                }).on('mouseleave', function() {
                    $(this).children('.dropdown-menu').removeClass('show');
                });

                $('.tabbable.nav-tabs-vertical.nav-tabs-left  .tab-content  .tab-pane.active .navbar  .multiselect > .multiselect-selected-text').width('');
            }
            else {

                // Remove mini sidebar indicator
                $('body').removeClass('sidebar-xs-indicator');

                // Revert back right sidebar
                $('.sidebar-opposite').insertAfter('.content-wrapper');

                // Remove all mobile sidebar classes
                $('body').removeClass('sidebar-mobile-main sidebar-mobile-secondary sidebar-mobile-opposite');

                // Initialize nicescroll on tablets+
                $(".menu-list").niceScroll({
                    mousescrollstep: 100,
                    cursorcolor: '#ccc',
                    cursorborder: '',
                    cursorwidth: 3,
                    hidecursordelay: 200,
                    autohidemode: 'scroll',
                    railpadding: {right: 0.5}
                });

                // Remove visibility of heading elements on desktop
                $('.page-header-content, .panel-heading, .panel-footer').removeClass('has-visible-elements');
                $('.heading-elements').removeClass('visible-elements');

                // Disable appearance of dropdown submenus
                $('.dropdown-submenu').children('.dropdown-menu').removeClass('show');

                //F. Added
                $('.sidebar-category').filter(":not(.module-filter, .organization-filter, .prevent-default)").each ( function () {
                    $(this).find('[data-action=collapse]:last').addClass('rotate-180');
                    $(this).find('.category-content:last').show();
                    $(this).find('.organization-filter').show();
                });


                //S. Added
                self.adjustTableColumns();

                var multiSelect_width = $(window).width() - 763;
                if (multiSelect_width > 0 && multiSelect_width < 89) {
                    $('.tabbable.nav-tabs-vertical.nav-tabs-left  .tab-content  .tab-pane.active .navbar  .multiselect > .multiselect-selected-text').width(multiSelect_width);
                } else {
                    $('.tabbable.nav-tabs-vertical.nav-tabs-left  .tab-content  .tab-pane.active .navbar  .multiselect > .multiselect-selected-text').width('');
                }
            }
        }, 100);


    },


    initPopover: function() {
        // Popover
        $('[data-popup="popover"]').popover();

        $('[data-popup="popover"], [data-toggle="popover"]').on('click', function(e) {
            e.stopPropagation();
        });


        $(document).on('click', function(e) {
            if ($(e.target).hasClass('popover-content') || $(e.target).parents('.popover-content').length) {
                return;
            }
            $('.popover').each(function() {
                $(this).popover('hide');
            });
        });

        $(document).keyup(function(e) {
            if (e.keyCode === 27) {
                $('.popover').each(function() {
                    $(this).popover('hide');
                });
            }
        });

        /****** Bootstrap Popover Bug Fix *****/
         $('body').on('hidden.bs.popover', function (e) {
             if ($(e.target).data("bs.popover")) {
                 $(e.target).data("bs.popover").inState = { click: false, hover: false, focus: false }
             }
         }).on('show.bs.popover', function(e, d) {
             if ($(e.target).data("bs.popover")) {
                 if ($(e.target).data("bs.popover").options.trigger !== 'hover') {
                    $('.popover').popover('hide');
                 }
             }

         });
    },


    initTooltip: function() {
        // Tooltip
        $('[data-popup="tooltip"]').tooltip();

        //F. Added
        $('#navbar-mobile [data-toggle=collapse]').click(function () {
            $('#navbar-mobile .collapse').collapse('hide');
        });

        $('.module-filter.collapse').collapse('hide');
    },

    initTable: function() {
        $('table:not(.has-fluid-dropdown) .dropdown-menu').each(function () {
            if (!$(this).parents('.modal').length) {
                $(this).css('position', 'fixed');
                $(this).css('bottom', 'inherit');
            }
        });


        $("table:not(.has-fluid-dropdown)").on('click touchstart', ".dropdown", function (e) {
            var button = $(this).find('.btn.dropdown-toggle');
            if (!$(this).parents('.modal-dialog').length) {
				if ($(this).hasClass('dropup')) {
					$(this).find('.dropdown-menu').css('transform', 'translateY(-100%)');
				}

				$(this).find('.dropdown-menu').css('top', $(this).offset().top - $(document).scrollTop() + $(this).height());
				$(this).find('.dropdown-menu').css('right', $(window).width() - $(this).offset().left - 190);
            }
        });

        $('.dataTables_scrollBody').scroll(function () {
            $('table:not(.has-fluid-dropdown) .dropdown .dropdown-menu').parent().removeClass('open');
            $('.select-dropdown .btn-group').removeClass('open');
        });


        $("table .select-dropdown").on('click touchstart', function () {
            $(this).find('.dropdown-menu').css('top', $(this).offset().top - $(document).scrollTop() + $(this).height());
            $(this).find('.dropdown-menu').css('left', $(this).offset().left);
            $(this).find('.dropdown-menu').css('height', 'auto');
            $(this).find('.dropdown-menu').css('width', ($(this).width() > $(this).find('.dropdown-menu').width()) ? $(this).width() : $(this).find('.dropdown-menu'));
        });
    },


    initModal: function() {
        var self = this;

        $(window).on('shown.bs.modal', function () {
            self.setWrapperSize();
            self.adjustTableColumns();
        });

        $(window).on('show.bs.modal', function () {
            if (jQuery().popover) {
                $('.popover').popover('hide');
            }
        });

        $(window).on('hide.bs.modal', function () {
            if (jQuery().popover) {
                $('.popover').popover('hide');
            }
        });
    },

    initDatePicker: function() {

        // ******** NEW *********

        if (jQuery().calendar && pickmeup) {
            // ***** SINGLE *******
            $('.daterange-single').calendar();


            // ****** RANGE ******
            $('.daterange-from-to').each(function() {
                if ($(this).data('hasclock')) {
                    $(this).calendar({
                        range: true,
                        clockpicker: true
                    });
                } else {
                    $(this).calendar({
                        range: true,
                        clockpicker: false
                    });
                }

            })

            $('.daterange-predefined').each(function() {
                if ($(this).data('hasclock')) {
                    $(this).calendar({
                        range: true,
                        clockpicker: true
                    });
                } else {
                    $(this).calendar({
                        range: true
                    });
                }


            });
        }


        $(document).on('click', '.daterange-from-to ~ .input-group-addon', function() {
            $(this).prev().trigger('click');
        });

        $(document).on('click', '.daterange-single ~ .input-group-addon', function() {
            if ($(this).prev().attr('data-calendar-open') == 'true') {
                $(this).prev().blur();
                $(this).prev().attr('data-calendar-open', false);
            } else {
                $(this).prev().trigger('click');
                $(this).prev().attr('data-calendar-open', true);
            }
        });

    },


    initLinkedMultiselect: function() {
        $('.linked-multiselect.customize').each(function () {
            var tableId = $(this).data('linked-table');
            var orderStart = $(tableId).data('order-start') || 1;
            var searchable = $(tableId).data('searchable');
            var orderable = $(tableId).data('orderable');
            var paging = $(tableId).data('paging');

            if (orderable === undefined) {
                orderable = true;
            }
            if (searchable === undefined) {
                searchable = true;
            }
            if (paging === undefined) {
                paging = true;
            }

            var table = $(tableId).DataTable({
                dom: '<"datatable-header1"fl>t',
                scrollX: true,
                autoWidth: false,
                searching: searchable,
                bFilter : searchable,
                bLengthChange: searchable,
                language: {
                    search: searchable ? '_INPUT_': false,
                    lengthMenu: searchable ? '<span class="dt-length-label">Show:</span> _MENU_' : false,
                    paginate: searchable ? {'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;'} : false,
                },
                order: [[orderStart, 'desc']],
                "ordering": orderable,
                paging: paging
            });
			var self = this;

            $(this).multiselect({
                enableHTML: true,
                // nonSelectedText: $(this).attr('data-label'),
                includeSelectAllOption: true,
                enableFiltering: true,
                enableCaseInsensitiveFiltering: true,
                templates: {
                    filter: '<li class="multiselect-item multiselect-filter"><i class="icon-search4"></i> <input class="form-control" type="text"></li>'
                },
                onSelectAll: function () {
                    $.uniform.update();
                    this.onChange();
                },
                onDeselectAll: function() {
                    this.onChange();
                },
                buttonText: function() {
                    return '<i class="icon-eye8"></i>';
                },
                onChange: function(option, checked, select) {

					var columnLenght = table.settings().columns()[0].length;

					$(self).children('option').each(function(i, el) {
						if (columnLenght > $(el).val()) {
							var column = table.column($(el).val());

							if ($(el).is(':selected')) {
								column.visible(true);
							} else {
								column.visible(false);
							}
						}

					});
                },
            });
        });

        $(this).parent().find('div.checker input').on('click', function (e) {
            var val = $(this).val();

        });

        // Add placeholder to the datatable filter option
        $('.dataTables_filter input[type=search]').attr('placeholder', 'Search...');


        if (jQuery().select2) {
            // Enable Select2 select for the length option
            $('.dataTables_length select').select2({
                minimumResultsForSearch: Infinity,
                width: 'auto'
            });
        }

    },


    _initClonedMultiSelect: function($el) {
        $el.find('.multiselect').each(function() {
            var label = $(this).data('label') || 'Nothing selected';
            var selectAll = $(this).data('selectall') == 'false' ? false : true;
            var self = this;
            $(this).multiselect({
                enableHTML: true,
                nonSelectedText: label,
                includeSelectAllOption: selectAll,
                onSelectAll: function () {
                    $.uniform.update();
                    this.onChange();
                },
                onDeselectAll: function() {
                    this.onChange();
                },
                onChange: function(option, checked) {
                    var selectedOptions = $(self).find('option:selected');
                    if (selectedOptions.length == 0) {
                        $(self).parent().prev('label.control-label').removeClass('is-visible');
                    } else {
                        $(self).parent().prev('label.control-label').addClass('is-visible');
                    }
                },
            });
        });
    },

    initMultiSelect: function() {
        $(':not(li.dropdown) > .multiselect').each(function() {
            var label = $(this).data('label') || 'Nothing selected';
            var selectAll = $(this).data('selectall') == 'false' ? false : true;
            var self = this;
            $(this).multiselect({
                enableHTML: true,
                nonSelectedText: label,
                includeSelectAllOption: selectAll,
                onSelectAll: function () {
                    $.uniform.update();
                    this.onChange();
                },
                onDeselectAll: function() {
                    this.onChange();
                },
                onChange: function(option, checked) {
                    var selectedOptions = $(self).find('option:selected');
                    if (selectedOptions.length == 0) {
                        $(self).parent().prev('label.control-label').removeClass('is-visible');
                    } else {
                        $(self).parent().prev('label.control-label').addClass('is-visible');
                    }
                },
                optionLabel: function(element){
                    if ($(element).attr('data-icon')) {
                        return $(element).html() + $(element).attr('data-icon');
                    }

                    return  $(element).attr('label') || $(element).html();
                },

            });
        });


        $('li.dropdown > .multiselect').each(function() {
            var label = $(this).data('label') || $(this).data('title');
            var selectAll = $(this).data('selectall') == 'false' ? false : true;
            $(this).multiselect({
                enableHTML: true,
                nonSelectedText: label,
                includeSelectAllOption: selectAll,
                enableClickableOptGroups: true,
                onSelectAll: function () {
                    $.uniform.update();
                },
                onDeselectAll: function() {
                    $.uniform.update();
                },
                onChange: function(option, checked) {
                    $.uniform.update();
                },
                buttonText: function(options) {
                    var selected = [];
                    for (var i = 0; i < options.length; i++) {
                        selected.push($(options[i]).text().trim());
                    }
                    if (selected.length > 3) {
                        return '<span class="text-semibold">'+label+': </span>' + selected.length + ' selected';
                    } else if (selected.length) {
                        return '<span class="text-semibold">'+label+': </span>' + selected.join(', ');
                    }

                    return '<span class="text-semibold">' + label + ': </span>Nothing selected';
                },
                optionLabel: function(element){
                    if ($(element).attr('data-icon')) {
                        return $(element).html() + $(element).attr('data-icon');
                    }

                    return  $(element).attr('label') || $(element).html();

                },
            });
        });
    },

    initDatatable: function() {
        $('.datatable-regular').each(function() {
            var searchable = $(this).data('searchable');
            var orderable = $(this).data('orderable');
            if (orderable === undefined) {
                orderable = true;
            }
            if (searchable === undefined) {
                searchable = true;
            }
            $(this).DataTable({
                dom: '<"datatable-header1"fl>t',
                scrollX: true,
                autoWidth: false,
                searching: searchable,
                bFilter : searchable,
                bLengthChange: searchable,
                language: {
                    search: searchable ? '_INPUT_': false,
                    lengthMenu: searchable ? '<span class="dt-length-label">Show:</span> _MENU_' : false,
                    paginate: searchable ? {'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;'} : false,
                },
                order: [[1, 'desc']],
                "ordering": orderable,
				drawCallback: function () {
	            	$(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
		        },
		        preDrawCallback: function() {
		            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
		        }
            });
        });

        $('.dataTables_filter input[type=search]').attr('placeholder', 'Search...');


        if (jQuery().select2) {
            // Enable Select2 select for the length option
            $('.dataTables_length select').select2({
                minimumResultsForSearch: Infinity,
                width: 'auto'
            });
        }


    },


    _initSidebarCollapsable: function() {
        var $title = $('.category-title:first > span');
        $('<a class="leftnav-collapse-btn hidden-xs" href="#"><i class="icon-arrow-left22"></i></a>').insertAfter($title);


        $(document).on('click', '.leftnav-collapse-btn', function(e) {
            e.preventDefault();
            var $pageContent = $('.page-content');
            if ($pageContent.hasClass('sidebar-xs')) {
                $pageContent.removeClass('sidebar-xs');
                $(this).find('i').removeClass().addClass('icon-arrow-left22');
            } else {
                $pageContent.addClass('sidebar-xs');
                $(this).find('i').removeClass().addClass('icon-arrow-right22');
            }
        });
    },

    initPageEvents: function() {
        var self = this;


        $('[data-toggle="popover"]').on('click', function(e) {
            e.preventDefault();
        });

        // Always Capital INPUT Field
        $(document).on('input', '.always-capital', function(e) {
            $(this).val(function (_, val) {
                return val.toUpperCase();
            });
        });


        $(document).on("shown.bs.tab", 'a[data-toggle="tab"]', function () {
            self.setWrapperSize();
            self.adjustTableColumns();
        });


        $(window).on('shown.bs.collapse', function () {
            window.setTimeout(function () {
                self.setWrapperSize();
                self.adjustTableColumns();
            }, 100);
        });

        $(window).on('hidden.bs.collapse', function () {
            self.setWrapperSize();
            self.adjustTableColumns();
        });

        //F. Added - FOR DEV MODE - TO BE REMOVED ON LIVE
        $('#development-mode-button').on('click', function () {
            $('#development-mode-message').toggleClass('show-message');
        });

    	//F. Added
        $('#switch-portal').on('click', function () {
            $('#portals-list1').toggleClass('show-message');
        });

    	//NM. Added
    	$(document).on('keyup', '#menu-filter-input, #setting-menu-filter-input', function () {
            var items, $row, $searchList;
            if ($(this).attr('id') == 'menu-filter-input') {
                items = $('#searchlist div.col-sm-4');
                $row = $("#searchlist .row");
                $searchList = $('#searchlist');
            } else {
                items = $('#setting-search-list div.col-sm-4');
                $row = $("#setting-search-list .row");
                $searchList = $('#setting-search-list');
            }
    		for (var i = 0; i < items.length; i++) {
    			var a = $(items[i]).find('a:nth-child(2)');
    			if ($(a)[0].innerHTML.toLowerCase().indexOf($(this).val().toLowerCase()) > -1) {
    				items[i].style.display = "";
    			} else {
    				items[i].style.display = "none";
    			}
    		}
    		var allChilds = 0;
    		var allHiddenChilds = 0;
    		$row.each( function( index, element1 ){
    			var totalChilds = 0;
    			var hiddenChilds = 0;
    			$(this).find('.col-sm-4').each( function( index, element2 ){
    				var child = $(element2).css('display');
    				if(child != 'block'){
    					hiddenChilds++;
    				}
    				totalChilds ++;
    			});
    			if (totalChilds == hiddenChilds) {
    				$(element1).hide();
    				$(element1).prev('.strike').hide();
    			} else {
    				$(element1).show();
    				$(element1).prev('.strike').show();
    			}
    			allChilds += totalChilds;
    			allHiddenChilds += hiddenChilds;
    		});
    		if (allChilds == allHiddenChilds) {
    			if(!$(".no-result").length) {
					$searchList.append('<div class="col-lg-12 no-result"><div style="padding: 20px 0;"> <h5>Ops.. Nothing found. Please update your search parameters </h5></div></div>');
    			}
    		} else {
    			$('.no-result').remove();
    		}
    	});

        this.adjustTableColumns();
        this.setWrapperSize();

        $("input[type='checkbox'].custom-disabled").uniform({disabledClass: ''});
        $("input[type='radio'].custom-disabled").uniform({disabledClass: 'choice', radioClass: 'choice'});
    },


    initFloatingLabels: function() {
        var showClass = "is-visible";

        // Floating Label
        $(document).on("checkval change keyup", 'input:not(.token-input):not(.bootstrap-tagsinput > input):not([type="checkbox"]), textarea, select' , function () {
            // console.log('Triggered!');
            var label = $(this).parents('.form-group-material').children(".control-label");
            if (this.value !== "") {
                label.addClass(showClass);
            }
            else {
                label.removeClass(showClass).addClass('animate');
            }
        });
        $(document).on('change', 'select', function () {
            if ($(this).children('option:first-child').is(':selected')) {
                $(this).parents('.form-group').addClass('select-placeholder');
            } else {
                $(this).parents('.form-group').removeClass('select-placeholder');
            }
        });


        $('input, textarea, select').trigger('checkval');
        $('select').trigger('change');
    },


    triggerFloatingLabels: function(el) {
        if (el) {
            if ($(el).find('.daterange-single').length && jQuery().calendar && pickmeup) {
                $(el).find('.daterange-single').calendar();
            }
            if ($(el).find('.daterange-from-to').length && jQuery().calendar && pickmeup) {
                $(el).find('.daterange-from-to').calendar({range:true});
            }

            $(el).find('input:not(.token-input):not(.bootstrap-tagsinput > input), textarea, select').trigger('checkval');
            $(el).find('select').trigger('change');
            $(el).find('.selectpicker').selectpicker('refresh');
            if ($(el).find('select.multiselect').length) {
                $(el).find('select.multiselect').next().remove();
                this._initClonedMultiSelect($(el));
            }
        }
    },



    personSearch: function($container) {
        var self = this;
        var spanPopover = '<span data-toggle="popover" class="label label-success ml-5 person-entities">3</span>';
        var dataSet = [
            [ "John Smith", "Person Relation, Alumni, " + spanPopover, "19 Haifa St, Paris, France", /* Nexts are hidden columns */ "Paris", "France", "Male", "+9422445", "john.smith@gmail.com" ],
            [ "Fredrick Jones", "Person Relation, Student", "5 Raise St, Brisbane, Australia", "Brisbane", "Australia", "Female", "+4422445",  "fr.jones10@gmail.com"],
            [ "Sarah Miller", "Person Relation, Student, " + spanPopover, "19 Es St, Essonne, France" , "Essonne", "France", "Female", "+9256783", "miller.sarrah@hotmail.com"],
            [ "Ashton Cox", "Person Relation, Alumni", "3 Lnd St, London, UK" ,"London", "UK", "Male", "+44890736", "ash.cox@yahoo.com"],
            [ "Ann Nixon", "Person Relation, Student " + spanPopover, "95 Haifa St, Bundoora, Australia", "Bundoora", "Australia", "Female", "+42364531", "nixann@ymail.com" ],
            [ "Ashley Young", "Person Relation", "9 Nd St, Delhi, India" , "Delhi", "India", "Male", "+7513273621", "young.ash@gmail.com"],
            [ "James Franco", "Person Relation, Alumni " + spanPopover, "2 Freedom St, Paris France", "Paris", "France", "Male", "+92445566", "thejamesfranco@gmail.com" ],
        ];
        var $firstname = $container.find('.firstname'),
            $surname = $container.find('.surname'),
            $city = $container.find('.city'),
            $country = $container.find('.country'),
            $gender = $container.find('.gender'),
            $cell = $container.find('.cell'),
            $email = $container.find('.email');

        var id = Math.random().toString(36).substring(2, 15);
        var $table = $('<div class="row"><div class="col-xs-12"><div class="table-responsive"><table id="'+id+'" class="table table-striped"></table></div></div></div>');

        $container.find('.auto-suggest-box').attr('id', id+ '_container')
                .addClass('bg-section')
                .append('<p class="suggest-title">Matching Results <button title="Hide Suggestions" type="button" class="close auto-suggest-close-btn">×</button></p>')
                .append($table);


        $container.find('.auto-suggest-close-btn').on('click', function() {
            $container.find('.auto-suggest-box').hide();
        });

        var table = $('#' + id).DataTable({
            data: dataSet,
            dom: '<"datatable-header1"fl>t',
            scrollX: true,
            scrollY: '80px',
            autoWidth: false,
            bLengthChange: false,
            columns: [
                { title: "Name" },
                { title: "Person Entity" },
                { title: "Physical Address" },
                { title: "City" },
                { title: "Country" },
                { title: "Gender" },
                { title: "Cell" },
                { title: "Email" },
            ],
            "columnDefs": [
                { "visible": false, "targets": [3, 4, 5, 6, 7] }
            ]
        });

        $firstname.on('keyup', function() {
            self._doPersonSearch(id, $firstname.val() + ' ' + $surname.val(), $city.val(), $country.val());
        });

        $surname.on('keyup', function() {
            self._doPersonSearch(id, $firstname.val() + ' ' + $surname.val(), $city.val(), $country.val());
        });

        $city.on('change', function(e, data) {
            if (!data) {
                self._doPersonSearch(id, $firstname.val() + ' ' + $surname.val(), $city.val(), $country.val());
            }
        });

        $country.on('change', function(e, data) {
            if (!data) {
                self._doPersonSearch(id, $firstname.val() + ' ' + $surname.val(), $city.val(), $country.val());
            }
        });

        $('#' + id).find('tbody tr').on('click', function(e) {
            if ($(e.target).hasClass('person-entities')) {
                self._initPersonSearchTablePopovers($(e.target));
                return;
            }

            var data = table.row($(this)).data();

            $firstname.val(data[0].split(' ')[0]).trigger('change', true).prop('disabled', true);
            $surname.val(data[0].split(' ')[1]).trigger('change', true).prop('disabled', true);
            $city.selectpicker('val', data[3]).trigger('change', true).prop('disabled', true).selectpicker('refresh');
            $country.selectpicker('val', data[4]).trigger('change', true).prop('disabled', true).selectpicker('refresh');

            $gender.selectpicker('val', data[5]).trigger('change').prop('disabled', true).selectpicker('refresh');
            $cell.val(data[6]).trigger('change').prop('disabled', true);
            $email.val(data[7]).trigger('change').prop('disabled', true);

            $('#' + id + '_container').hide();
            $('<div class="row"><div class="col-xs-12 text-right"><a title="Reset Fields" class="clear-fields no-margin-right mt-5" href="#">RESET</a></div></div>')
                .insertBefore($container.find('.auto-suggest-box'));
            $container.find('.clear-fields').on('click', function() {
                $firstname.val('').prop('disabled', false).trigger('change');
                $surname.val('').prop('disabled', false).trigger('change');
                $city.selectpicker('val', '').prop('disabled', false).selectpicker('refresh').trigger('change', true);
                $country.selectpicker('val', '').prop('disabled', false).selectpicker('refresh').trigger('change', true);
                $gender.selectpicker('val', '').prop('disabled', false).selectpicker('refresh').trigger('change');
                $cell.val('').trigger('change').prop('disabled', false);
                $email.val('').trigger('change').prop('disabled', false);
                $(this).remove();
            });


        });
    },


    _doPersonSearch: function(id, fullname, city, country) {

        if (!this._trim(fullname) && !city && !country) {
            return $('#' + id + '_container').hide();
        }

        var table = $('#' + id).DataTable();
        table.columns(0).search(this._trim(fullname)).draw();
        table.columns(3).search(this._trim(city)).draw();
        table.columns(4).search(this._trim(country)).draw();

        $('#' + id + '_container').show()
        var len = table.rows(':visible').count();
        if (len) {
            $('#' + id + '_container').show().find('.dataTables_filter').hide();
            table.draw();
        } else {
            $('#' + id + '_container').hide();
        }
    },

    _initPersonSearchTablePopovers: function($el) {



        $el.popover('destroy');
        $el.popover({
            'html': true,
            // "trigger": 'click',
            "placement": 'top',
            container: 'body',
            content: function() {
                return '<div class="row">' +
                        '<div class="col-xs-12">' +
                            '<strong>Student</strong> (ABC Academy Campus, ABC Academy, Europe, ABC Group)' +
                        '</div>' +
                        '<div class="col-xs-12">' +
                            '<hr class="mt-5 mb-5">' +
                        '</div>' +
                        '<div class="col-xs-12">' +
                            '<strong>Staff</strong> (Asia, ABC Group)' +
                        '</div>' +
                        '<div class="col-xs-12">' +
                            '<hr class="mt-5 mb-5">' +
                        '</div>' +
                        '<div class="col-xs-12">' +
                            '<strong>Relation</strong> (ABC Academy Campus, ABC Academy, Europe, ABC Group)' +
                        '</div>' +
                    '</div>';
            }
        });

        setTimeout(function() {

            if ($el.data("bs.popover")) {
                $el.data("bs.popover").inState = { click: true, hover: false, focus: false }
            }
            $el.popover('show');
        }, 160);

    },



    companySearch: function($container) {
        var self = this;
        var dataSet = [
            [ "ABC Ltd", "General", "19 Haifa St, Melbourne, Australia", /* Nexts are hidden columns */ "Melbourne", "Australia", "info@abc.org" ],
            [ "XYZ Ltd", "Transport", "5 Raise St, Melbourne, Australia", "Brisbane", "Australia", "support@xyz.org" ],
            [ "ABC Pty Ltd", "General", "2 Rue des Barres, Melbourne, Australia", "Paris", "France", "abc.inc@abc.net"],
        ];
        var $name = $container.find('.company-name'),
            $type = $container.find('.company-type'),
            $email = $container.find('.email'),
            $city = $container.find('.city'),
            $country = $container.find('.country');

        var id = Math.random().toString(36).substring(2, 15);
        var $table = $('<div class="row"><div class="col-xs-12"><div class="table-responsive"><table id="'+id+'" class="table table-striped"></table></div></div></div>');

        $container.find('.auto-suggest-box').attr('id', id+ '_container')
                .addClass('bg-section')
                .append('<p class="suggest-title">Matching Results <button title="Hide Suggestions" type="button" class="close auto-suggest-close-btn">×</button></p>')
                .append($table);


        $container.find('.auto-suggest-close-btn').on('click', function() {
            $container.find('.auto-suggest-box').hide();
        });

        var table = $('#' + id).DataTable({
            data: dataSet,
            dom: '<"datatable-header1"fl>t',
            scrollX: true,
            autoWidth: false,
            scrollY: '80px',
            bLengthChange: false,
            columns: [
                { title: "Company" },
                { title: "Type" },
                { title: "Physical Address" },
                { title: "City" },
                { title: "Country" },
                { title: "Email" },
            ],
            "columnDefs": [
                { "visible": false, "targets": [3, 4, 5] }
            ]
        });

        $name.on('keyup', function() {
            self._doCompanySearch(id, $name.val(), $type.val(), $city.val(), $country.val());
        });

        $type.on('change', function(e, data) {
            if (!data) {
                self._doCompanySearch(id, $name.val(), $type.val(), $city.val(), $country.val());
            }
        });

        $city.on('change', function(e, data) {
            if (!data) {
                self._doCompanySearch(id, $name.val(), $type.val(), $city.val(), $country.val());
            }
        });

        $country.on('change', function(e, data) {
            if (!data) {
                self._doCompanySearch(id, $name.val(), $type.val(), $city.val(), $country.val());
            }
        });

        $('#' + id).find('tbody tr').on('click', function() {
            var data = table.row($(this)).data();

            $name.val(data[0]).trigger('change', true).prop('disabled', true);
            $type.selectpicker('val', data[1]).trigger('change', true).prop('disabled', true).selectpicker('refresh');
            $city.selectpicker('val', data[3]).trigger('change', true).prop('disabled', true).selectpicker('refresh');
            $country.selectpicker('val', data[4]).trigger('change', true).prop('disabled', true).selectpicker('refresh');
            $email.val(data[5]).trigger('change', true).prop('disabled', true);

            $('#' + id + '_container').hide();

            $('<div class="row"><div class="col-xs-12 text-right"><a title="Reset Fields" class="clear-fields no-margin-right mt-5" href="#">RESET</a></div></div>')
                .insertBefore($container.find('.auto-suggest-box'));
            $container.find('.clear-fields').on('click', function() {
                $name.val('').prop('disabled', false).trigger('change');
                $type.selectpicker('val', '').prop('disabled', false).selectpicker('refresh').trigger('change', true);
                $country.selectpicker('val', '').prop('disabled', false).selectpicker('refresh').trigger('change', true);
                $city.selectpicker('val', '').prop('disabled', false).selectpicker('refresh').trigger('change');
                $email.val('').trigger('change').prop('disabled', false);
                $(this).remove();
            });
        });
    },


    _doCompanySearch: function(id, name, type, city, country) {

        if (!this._trim(name) && !type && !city && !country) {
            return $('#' + id + '_container').hide();
        }

        var table = $('#' + id).DataTable();
        table.columns(0).search(this._trim(name)).draw();
        table.columns(1).search(this._trim(type)).draw();
        table.columns(3).search(this._trim(city)).draw();
        table.columns(4).search(this._trim(country)).draw();

        $('#' + id + '_container').show()
        var len = table.rows(':visible').count();
        if (len) {
            $('#' + id + '_container').show().find('.dataTables_filter').hide();
            table.draw();
        } else {
            $('#' + id + '_container').hide();
        }
    },


    _trim: function(value) {
        if (value) {
            return value.trim();
        }
        return '';
    },



    // ******* Search Component **********
    _filter: function(suggestions, arr) {
        return $.grep(suggestions, function(suggestion) {
            return $.inArray(suggestion.value, arr) === -1;
        });
    },

    _setSearchData: function(type) {
        if (type == 'person' && !this._personList) {
            var _persons = [{
                l0: "<img src='../../assets/images/avatar1.jpg' class='img-circle img-xxs mr-5' alt=''>",
                value: "John Smith",
                l1: '123456',
                gender: 'Male',
                firstname: 'John',
                surname: 'Smith',
                cell: '+44124234',
                email: 'john.smith@gmail.com',
                country: 'France',
                city: 'Paris',
                data: [{
                    "l0": "Student",
                    "l1": "Bsc Engineering",
                    "l2": "ABC Academy",
                    "l3": "S123232"
                },
                {
                    "l0": "Staff",
                    "l1": "Teacher",
                    "l2": "ABC Academy",
                    "l3": "T123334"
                }]
            }, {
                l0: "<img src='../../assets/images/avatar10.jpg' class='img-circle img-xxs mr-5' alt=''>",
                value: "Julia Nixon",
                l1: '123457',
                gender: 'Female',
                firstname: 'Julia',
                surname: 'Nixon',
                cell: '+44154233',
                email: 'nix.jul@ed-admin.com',
                country: 'Australia',
                city: 'Bundoora',
                data: [{
                    "l0": "Student",
                    "l1": "Bsc Engineering",
                    "l2": "ABC Academy",
                    "l3": "S123232"
                }]
            }, {
                l0: "<img src='../../assets/images/avatar3.jpg' class='img-circle img-xxs mr-5' alt=''>",
                value: "Genny Jackson",
                l1: '123458',
                gender: 'Female',
                firstname: 'Genny',
                surname: 'Jackson',
                cell: '+48236209',
                email: 'genny.jack@gmail.com',
                country: 'Australia',
                city: 'Brisbane',
                data: [{
                    "l0": "Student",
                    "l1": "Bsc Engineering",
                    "l2": "ABC Academy",
                    "l3": "S123232"
                },
                    {
                        "l0": "Staff",
                        "l1": "Teacher",
                        "l2": "ABC Academy",
                        "l3": "T123334"
                    }, {
                        "l0": "Alumni",
                        "l1": "",
                        "l2": "ABC Academy",
                        "l3": "A425334"
                    }]
            }
            ];

        	var _personList = new Bloodhound({
                datumTokenizer: function (d) {
                    return Bloodhound.tokenizers.whitespace(d.value);
                },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: $.map(_persons, function (d) {
                    return {
                        data: d.data,
                        l0: d.l0,
                        l1: d.l1,
                        value: d.value,
                        show: d.value,
                        gender: d.gender,
                        firstname: d.firstname,
                        surname: d.surname,
                        cell: d.cell,
                        email: d.email,
                        city: d.city,
                        country: d.country,
                        suggest: d
                    }
                })
            });

            this._personList = _personList;
            this._personList.initialize();


        } else if (type == 'company' && !this._compnayList) {
            var _companies = [{
                l0: "<img src='../../assets/images/company.png' class='img-circle img-xxs mr-5' alt=''>",
                value: "Company ABC Pty Ltd",
                l1: '123456',
        		l2: 'Primary Postal - 711-2880 Nulla St. ..., Melbourne',
                name: 'Company ABC',
                type: 'General',
                email: 'info@abccompany.com',
                country: 'France',
                city: 'Paris',
            }, {
                l0: "<img src='../../assets/images/company.png' class='img-circle img-xxs mr-5' alt=''>",
                value: "Company CC.",
                l1: '123457',
        		l2: 'Primary Physical, 711-2880 Nulla St. ..., Melbourne',
                name: 'Company CC.',
                legalStatus: 'PTY LTD',
                type: 'Transport',
                email: 'support@cc.com',
                country: 'Australia',
                city: 'Brisbane',
            }];

        	var _companyList = new Bloodhound({
                datumTokenizer: function (d) {
                    return Bloodhound.tokenizers.whitespace(d.value);
                },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: $.map(_companies, function (d) {
                    return {
                        data: d.data,
                        l0: d.l0,
                        l1: d.l1,
        				l2: d.l2,
                        email: d.email,
                        country: d.country,
                        city: d.city,
                        type: d.type,
                        name: d.name,
                        value: d.value,
                        show: d.value,
                        suggest: d
                    }
                })
            });

            this._companyList = _companyList;
            this._companyList.initialize();
        }

    },

    _onSearchedItemDelete: function($parent, type) {
        if ($parent && type == 'person') {
            $parent.find('.firstname').val('').trigger('change');
            $parent.find('.surname').val('').trigger('change');
            $parent.find('.gender').selectpicker('val', '').trigger('change');
            $parent.find('.cell').val('').trigger('change');
            $parent.find('.email').val('').trigger('change');
            $parent.find('.country').selectpicker('val', '').trigger('change');
            $parent.find('.city').selectpicker('val', '').trigger('change');
        } else if ($parent && type == 'company') {
            $parent.find('.company-name').val('').trigger('change');
            $parent.find('.email').val('').trigger('change');
            $parent.find('.country').selectpicker('val', '').trigger('change');
            $parent.find('.city').selectpicker('val', '').trigger('change');
            $parent.find('.company-type').selectpicker('val', '').trigger('change');
        }
    },


    initSearch: function($input, type, multiple) {
        this._setSearchData(type);
        var self = this;
        (function() {
            var list, _parent;
            if (type == 'person') {
                list = self._personList;
            } else if (type == 'company') {
                list = self._companyList;
            }
            var selected = [];
            $input.tokenfield({
            typeahead: [null, {
                name: "search",
                display: "show",
                source: function(query, cb) {
                    list.search(query, function(suggestions) {
                        cb(self._filter(suggestions, selected));
                        cb(suggestions);
                    });
                },
                templates: {
                    notFound: [
                        "<div class='empty-message' style='padding:20px;'>",
                        "Sorry, unable to find any " + type + " matching the current query...",
                        "</div>"
                    ].join("\n"),
                    suggestion: function (data) {
                        if (type == 'company') {
                            var result = '<div class="pr-10">';
        					result += '<div class="pull-left">' + data.l0 + ' <strong>' + data.value + '</strong></div>';
        					result += '<div class="pl-10" style="margin-top:2px;overflow:hidden;">';
        					result += '<p style="white-space: normal;">, ' + data.l2  + '</p>';
        					result += '</div></div>';
        					return result;
                        } else if (type == 'person') {
                            var result = '<div id="' + data.l1 + '" class="pr-10">';
                            result += '<div class="pull-left">' + data.l0 + ' <strong>' + data.value + '</strong></div>';
                            result += '<div class="pl-10" style="margin-top:2px;overflow:hidden;">';
                            for (var i = 0; i < data.data.length; i++) {
                                result += '<p class="mb-0" style="white-space: normal;">' + data.data[i].l0 + ', ' + data.data[i].l1 + ', ' + data.data[i].l2 + ', ' + data.data[i].l3 + '</p>';
                            }
                            result += '</div></div>';
                            return result;
                        }

                    }
                }
            }],}).on('tokenfield:createdtoken', function (e) {
    			if(!e.attrs.l0){
    				$(e.relatedTarget).remove();
    				$input.typeahead('close');
                    return;
    			}

    			$(e.relatedTarget).remove();

                if (type == 'person') {
                    var $parent = $input.closest('.search-component').parent();
                    _parent = $parent;
                    $parent.find('.firstname').val(e.attrs.firstname).trigger('change');
                    $parent.find('.surname').val(e.attrs.surname).trigger('change');
                    $parent.find('.gender').selectpicker('val', e.attrs.gender).trigger('change');
                    $parent.find('.cell').val(e.attrs.cell).trigger('change');
                    $parent.find('.email').val(e.attrs.email).trigger('change');
                    $parent.find('.country').selectpicker('val', e.attrs.country).trigger('change');
                    $parent.find('.city').selectpicker('val', e.attrs.city).trigger('change');
                } else if (type == 'company') {
                    var $parent = $input.closest('.search-component').parent();
                    _parent = $parent;
                    $parent.find('.company-name').val(e.attrs.name).trigger('change');
                    $parent.find('.email').val(e.attrs.email).trigger('change');
                    $parent.find('.country').selectpicker('val', e.attrs.country).trigger('change');
                    $parent.find('.city').selectpicker('val', e.attrs.city).trigger('change');
                    $parent.find('.company-type').selectpicker('val', e.attrs.type).trigger('change');
                }

    			if (multiple) {
                    selected.push(e.attrs.value);
                    var el = '<li class="grey-box"><div class="search-for-content"><span class="text-semibold mr-10">';
                    el += e.attrs.l0 + e.attrs.label + '</span><a href="#" class="close">×</a></div></li>';
                    var $el = $(el);
                    $input.closest('.search-component').find('.search-for-area').append($el);

                    $input.closest('.search-component').on('click', '.search-for-area a.close', function (e) {
                        e.preventDefault();
                        var $parent = $(this).closest('.search-for-area');
                		var value = $(this).closest('li').text().replace(/.$/,"");
                		selected = selected.filter(function(item) {
                			return item !== value;
                		});

                        $(this).closest('li').remove();
                        self._onSearchedItemDelete(_parent, type);
                    });

    			} else {
    				selected = [];
                    selected.push(e.attrs.value);
                    var label = $input.closest('.form-group').children('.control-label:first').html();
                    var el ='<div class="form-group form-group-material">' +
                                '<label class="control-label always-visible">'+label+'</label>'+
                                '<div class="clickable" style="margin-top:8px;padding-bottom:9px;border-bottom:1px solid #ddd;"><span class="mr-10">' +
                                e.attrs.label + '</span><a style="margin-top:-1px;" href="#" class="close">×</a></div>' +
                            '</div>';
    	            var $el = $(el);
	                var $formGroup = $input.parents('.form-group');
                    $formGroup.hide();
                    $el.insertAfter($formGroup);
    	            $el.find('a.close').on('click', function(e) {
    	                e.preventDefault();
                        $el.remove();
                        $formGroup.show();
    	                selected = [];
                        self._onSearchedItemDelete(_parent, type);
    	            });
    			}
            });
        })();
    },



    deleteAttachment: function(e, el) {
        e.preventDefault();
        $(el).closest('li').hide();
        var $undoDelete = $(el).closest('ul.attached-area').find('li.undo-delete');

        var deletedItemTitle = $(el).prev().attr('title');

        var title = $undoDelete.attr('title');
        if (!title) {
            title = '';
        }
        var t = $('<div/>').html('&#013;&#013;').text();
        $undoDelete.attr('title', title + t + deletedItemTitle);

        $undoDelete.show();
    },

    undoDeletedItems: function(e, el) {
        $(el).closest('ul.attached-area').find('li:hidden').show();
        $(el).parent().hide();
        $(el).parent().attr('title', '');
    },



    // Main Functions and All Event Listeners
    init: function() {
        var self = this;
        this.adjustTableColumns();
        this.setWrapperSize();
        this.containerHeight();
        this.initHeadingElements();
        this.initNavbar();
        this.initDrillDown();
        this.initPanels();
        this.initHeaderComponent();
        this.initLeftNavComponent();
        this.initFooterComponent();
        this.initMobileSidebar();
        this.initPopover();
        this.initTooltip();
        this.initTable();
        this.initModal();
        this.initDatePicker();
        this.initChatComponent();
        this.initMultiSelect();
        this.initLinkedMultiselect();
        this.initDatatable();

        this.initPageEvents();

        this.initFloatingLabels();
    },

};



$(window).on('load', function () {
    $('body').removeClass('no-transitions');
    $(".form-group-material").children('.control-label.is-visible').removeClass('animate');
    app._initSidebarCollapsable();
    app.adjustTableColumns();
    app.setWrapperSize();
});


$(window).on('resize', function () {
    app.onWindowResize();
}).resize();


$(window).on('scroll', function () {
    app.onWindowScroll();
});


$(function () {

    app.init();


});
