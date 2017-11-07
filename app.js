'use strict';

angular.module('ForEx', [])
.controller('ConvertCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.rates = [
       { "Id"  : "USD" ,"name":  "Dollar", "symbol" : "$"},
       { "Id"  : "AUD" ,"name": "Australian Dollar", "symbol" : "$"},
       { "Id"  : "BRL" ,"name": "Brazilian Real ", "symbol" : "R$"},
       { "Id"  : "CAD" ,"name": "Canada Dollar", "symbol" : "$"},
       { "Id"  : "CHF" ,"name": "Switzerland Franc", "symbol" : "CHF"},
       { "Id"  : "CLP" ,"name": "Chilean Peso ", "symbol" : "$"},
       { "Id"  : "CNY" ,"name": "China Yuan ", "symbol" : "¥"},
       { "Id"  : "DKK" ,"name": "Denmark Krone", "symbol" : "kr"},
       { "Id"  : "EUR" ,"name": "Euro", "symbol" : "€"},
       { "Id"  : "GBP" ,"name": "ound", "symbol" : "£"},
       { "Id"  : "INR" ,"name": "Rupee", "symbol" : "₹"},
       { "Id"  : "ISK" ,"name": "Icelandic Krona", "symbol" : "kr"},
       { "Id"  : "JPY" ,"name": "Japan Yen", "symbol" : "¥"},
       { "Id"  : "KRW" ,"name": "Korea (South)", "symbol" : "₩"},
       { "Id"  : "NZD" ,"name": "New Zealand Dollar", "symbol" : "$"},
       { "Id"  : "PLN" ,"name": "Poland Zloty", "symbol" : "zł"},
       { "Id"  : "RUB" ,"name": "Russian Ruble ", "symbol" : "RUB"},
       { "Id"  : "SEK" ,"name": "Sweden Krona", "symbol" : "kr"},
       { "Id"  : "SGD" ,"name": "Singapore Dollar", "symbol" : "$"},
       { "Id"  : "THB" ,"name": "Thailand Baht", "symbol" : "฿"},
       { "Id"  : "TWD" ,"name": "Taiwan New Dollar", "symbol" : "NT$"}
       
    ];

    $scope.forExConvert = function() {
        
        var coinObj =$scope.toType
        if (angular.isObject(coinObj)){          
           $http.get("https://index.bitcoin.com/api/v0/price/"+coinObj.Id)
           .then(function(res){               
                var rate =res.data.price
                var finalPrice=rate*$scope.fromValue
                var fixPrice= $scope.GetFixedPrice(finalPrice)

                $scope.toValue = fixPrice 
                $scope.Rate = $scope.GetFixedPrice(rate)
               
           })
        }
    }

    Number.prototype.format = function(n, x) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
        return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
    };

    $scope.GetFixedPrice = function(price)
    {
        var fixPrice =price/100
        return fixPrice.format(2,3)        
    }

    $scope.toType = $scope.rates[0];
    $scope.fromValue = 1;
    $scope.forExConvert();
}])