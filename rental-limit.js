(function() {
  var LISTING_LIMIT = 5;
  var TIER_NAME = "Starter";
  var UPGRADE_URL = "https://accompels.com/upgrade";
  var CALENDAR_URL = "https://accompels.com/book-a-call";
  var SUPPORT_EMAIL = "support@accompels.com";

  function countListings() {
    return document.querySelectorAll(
      '#listingsTableContainer [class*="dragArea"] > [data-v-4cbdcf64]'
    ).length;
  }

  function showModal() {
    if (document.getElementById('rl-modal')) return;
    var d = document.createElement('div');
    d.id = 'rl-modal';
    d.setAttribute('style', 'position:fixed;inset:0;background:rgba(0,0,0,0.65);display:flex;align-items:center;justify-content:center;z-index:999999;font-family:Arial,sans-serif;');
    d.innerHTML = [
      '<div style="background:#fff;border-radius:16px;padding:44px 40px;',
      'width:460px;max-width:92vw;position:relative;',
      'box-shadow:0 24px 64px rgba(0,0,0,0.28);text-align:center;">',
        '<button onclick="document.getElementById(\'rl-modal\').remove()" ',
        'style="position:absolute;top:14px;right:18px;border:none;',
        'background:none;font-size:22px;cursor:pointer;color:#aaa;">&#x2715;</button>',
        '<div style="font-size:44px;margin-bottom:12px;">&#127968;</div>',
        '<h2 style="color:#1E3A5F;margin:0 0 10px;font-size:22px;font-weight:700;">',
          'You\'ve reached your listing limit',
        '</h2>',
        '<p style="color:#666;font-size:15px;line-height:1.6;margin:0 0 24px;">',
          'Your <strong>', TIER_NAME, '</strong> plan includes up to ',
          '<strong>', LISTING_LIMIT, ' listing', (LISTING_LIMIT !== 1 ? 's' : ''), '</strong>.',
          '<br>Upgrade to add more properties and unlock advanced features.',
        '</p>',
        '<a href="', UPGRADE_URL, '" target="_blank" ',
        'style="display:block;width:100%;padding:15px;background:#1E3A5F;',
        'color:#fff;text-align:center;border-radius:10px;text-decoration:none;',
        'font-weight:700;font-size:16px;margin-bottom:14px;box-sizing:border-box;">',
          'Upgrade My Plan',
        '</a>',
        '<a href="', CALENDAR_URL, '" target="_blank" ',
        'style="display:block;text-align:center;color:#2E86AB;',
        'font-size:14px;text-decoration:underline;margin-bottom:20px;">',
          'Talk to our team',
        '</a>',
        '<p style="text-align:center;color:#ccc;font-size:12px;margin:0;">',
          'Questions? ', SUPPORT_EMAIL,
        '</p>',
      '</div>'
    ].join('');
    document.body.appendChild(d);
    d.addEventListener('click', function(e) {
      if (e.target === d) d.remove();
    });
  }

  function tryHook() {
    var btn = document.getElementById('new-listing');
    if (btn && !btn._rl_hooked) {
      btn._rl_hooked = true;
      console.log('[RentalLimit] Hooked | Limit: ' + LISTING_LIMIT);
      btn.addEventListener('click', function(e) {
        var count = countListings();
        console.log('[RentalLimit] Count: ' + count + ' | Limit: ' + LISTING_LIMIT);
        if (count >= LISTING_LIMIT) {
          e.preventDefault();
          e.stopImmediatePropagation();
          showModal();
        }
      }, true);
    }
  }

  setTimeout(function() {
    var t = setInterval(function() {
      var url = window.location.href.toLowerCase();
      if (url.indexOf('rental') > -1 || url.indexOf('listing') > -1) {
        tryHook();
        var btn = document.getElementById('new-listing');
        if (btn && btn._rl_hooked) {
          clearInterval(t);
          console.log('[RentalLimit] Interval cleared');
        }
      }
    }, 1000);
  }, 2000);

})();
