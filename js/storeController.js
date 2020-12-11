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
        $scope.updateFilter = function(type) {
            
            if(type === 'cart') {
                this.filter.cartItems = !this.filter.cartItems;
                this.filter.favorite = false;
            }else if(type === 'favorite') {
                this.filter.favorite = !this.filter.favorite;
                this.filter.cartItems = false;
            }
            this.onFilterApply();
        }
        $scope.onFilterApply = function(type) {
           
            $scope.productsData = angular.copy($scope.allProductData);
            if($scope.filter.favorite) {
                $scope.productsData = $scope.productsData.filter(p => p.is_favourite_product);
            }
            if($scope.filter.cartItems) {
                $scope.productsData = $scope.productsData.filter(p => p.isInCart);
            }
            if($scope.filter.search) {
                this.productsData = this.productsData.filter((item) => {
                    return (item.name.toLowerCase().includes($scope.filter.search.toLowerCase()) 
                    ||  item.manufacturer_sku && item.manufacturer_sku.toLowerCase().includes($scope.filter.search.toLowerCase()) 
                    ||  item.manufacturer &&  item.manufacturer.name.toLowerCase().includes($scope.filter.search.toLowerCase())
                    ||  item.office_inventory_item_id && item.office_inventory_item_id.toLowerCase().includes($scope.filter.search)
                    );
                  });
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
            } else if(value === 'remove') {
                a.isInCart = false;
            } else if( value === 'favorite') {
                a.is_favourite_product = !a.is_favourite_product;
            }
            this.onFilterApply();
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
        window.addEventListener('scroll',(e)=>{
            const nav = document.querySelector('.search_area');
            if(window.pageYOffset>0){
              nav.classList.add("add-shadow");
            }else{
              nav.classList.remove("add-shadow");
            }
          });
       
    });