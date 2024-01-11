'use strict';

try {
  angular.module('cartAppTranslations');
} catch (e) {
  angular.module('cartAppTranslations', ['pascalprecht.translate']);
}

angular.module('cartAppTranslations').config(['$translateProvider',
  function ($translateProvider) {
    var translations = {
      'cartWidget': {
        'sr': {
          'PRODUCT_PRICE_BEFORE_DISCOUNT': 'Giá thông thường',
          'PRODUCT_WAS_REMOVED': 'Đã loại bỏ {{ productName }} khỏi giỏ hàng',
          'PRODUCT_PRICE_WHEN_THERE_IS_NO_DISCOUNT': 'Giá',
          'PRODUCT_PRICE_AFTER_DISCOUNT': 'Giá bán rẻ'
        }
      },
      'cartPopUp': {
        'itemsSubtotal': {
          'plural': 'Tổng từng phần ({{numOfItems}} mặt hàng):',
          'singular': 'Tổng từng phần ({{numOfItems}} mặt hàng):'
        },
        'successMessage': {
          'title': 'Đã thêm vào giỏ hàng của bạn'
        }
      },
      'CART_WIDGET_EMPTY_CART_MESSAGE': 'Giỏ hàng trống',
      'CART_WIDGET_CURRENCY_CONVERTER_DISCLAIMER': 'Được xử lý theo {{mainCurrency}}',
      'CART_WIDGET_VIEW_CART_BUTTON': 'Xem giỏ hàng',
      'CART_WIDGET_CLOSE_CTA': 'Đóng',
      'OUT_OF_STOCK_TITLE': 'Hết tồn kho',
      'CART_TABLE_TOTAL_TITLE': 'TỔNG',
      'CART_WIDGET_CLOSE_BUTTON_TITLE': 'Đóng tiện ích giỏ hàng',
      'SUBTOTAL_TITLE': 'Tổng từng phần',
      'CART_WIDGET_QUANTITY_TITLE': 'SL: ',
      'REMOVE_PRODUCT_BUTTON_TITLE': 'Loại bỏ mặt hàng',
      'SKU_TITLE': 'SKU: {{ sku }}',
      'CART_WIDGET_CART_TITLE': 'Giỏ hàng'
    };
    $translateProvider.translations('vi', translations);
    $translateProvider.translations(translations);
    $translateProvider.preferredLanguage('vi');
  }
]);