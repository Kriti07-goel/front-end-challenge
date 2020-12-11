angular.module('test')
    .controller('storeController', function($scope, $http) {
        $scope.name = 'Kriti Goel';
        $scope.cartItems = [];
        $scope.filter = {
            search : '',
            favorite: false,
            cartItems: false
        }
        $http.get('http://demo5514996.mockable.io/products').
        then(function(response) {
            $scope.productsData = response.data.hits;
            $scope.productsData.map(a => {
                a.isInCart = false;
            });
            $scope.allProductData = angular.copy($scope.productsData);
           
        });
        $scope.onFilterApply = function(type) {
            if(type === 'cart') {
                this.filter.cartItems = !this.filter.cartItems;
            }else if(type === 'favorite') {
                this.filter.favorite = !this.filter.favorite;
            }
            $scope.productsData = angular.copy($scope.allProductData);
            if($scope.filter.favorite) {
                $scope.productsData = $scope.productsData.filter(p => p.is_favourite_product);
            }
            if($scope.filter.cartItems) {
                $scope.productsData = $scope.productsData.filter(p => p.isInCart);
            }

        }
        $scope.addItems = function(item) {
            item.isInCart = true;
            if(this.cartItems.length == 0) {
                this.cartItems.push(item);
            } else {
                var exist = false;
                $scope.cartItems.forEach(element => {
                    if(element.isInCart && element.id === item.id) {
                        exist = true;
                    } 
                });
                if(!exist) {
                    this.cartItems.push(item);
                }
            }
            $scope.updatellItem(item, 'add');
        }
        $scope.updatellItem = function(item, value) {
            const a = this.allProductData.find(i => i.id === item.id);
            if(value === 'add'){
                a.isInCart = true;
            } else if(type === 'remove') {
                a.isInCart = false;
            } else if( type === 'favorite') {
                a.is_favourite_product = !a.is_favourite_product;
            }
            console.log(this.allProductData);
        }
        $scope.removeItem = function(item) {
            const r = this.cartItems.find(c => c.id === item.id);
            const i = this.cartItems.findIndex(x => x.id === item.id);
            r.isInCart = false;
            this.cartItems.splice(i, i>=0 ? 1:  0);
            $scope.updatellItem(item, 'remove');

        }
        $scope.markAsFavorite = function(item) {
            item.is_favourite_product = !item.is_favourite_product;
            this.updatellItem(item, 'favorite');
        }
       
    });