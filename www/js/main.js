var PEMenu = (function () {

    function tryToToggleCart(e, action) {
        if (e.target.attributes && e.target.attributes.iscart) {
            Cart.toggle(action, e.target.attributes.type.value);
            return true;
        }
    }

    function tryToScale (e) {
        if (e.target.attributes && e.target.attributes.scale) {
            Router.go('item-img');
            return true;
        }
    }

    return {
        init: function () {
            Dom.init();
            //Gestures.init();
            StateController.init();
            StateController.handleCurrentState();
            UpdateData();
        },
        menuAction: function (e) {
            var self = this;
            try {
                var action = findAction(e.target).action;
                if (!action) {
                    return;
                }
                switch (action) {
                    case 'home':
                        Router.go('home');
                        break;
                    default:
                        if (!Object.keys(self.menu[action].items).length) {
                            self.selectedMenu = action;
                            Router.go('select-category')
                        } else {
                            self.selectedMenu = null;
                            self.selectedCategory = action;
                            Router.go('show-items');
                        }
                }
                SideMenu.toggleMenu(false);
            } catch (err) {
                console.log(err);
            }
        },
        selectCategory: function (e) {
            var self = this,
                action = findAction(e.target).action,
                category;
            if (!action) {
                return;
            }
            self.showCategory(action);

        },
        showCategory: function (action) {
            var self = this,
                category = self.categories[self.categoryList[action]];
            self.selectedCategory = action;
            if (category.items) {
                Router.go('show-items');
                return;
            }
            if (category.childCategories) {
                Router.go('select-category');
                return;
            }
            if (category.description) {
                Router.go('category-description');
            }
        },
        showItemInfo: function (e) {
            var self = this,
                action = findAction(e.target);
            if (!action) {
                return;
            }
            action = action.action;
            self.selectedItem = action;
            if (tryToToggleCart(e, action)) {
                return;
            }
            Router.go('item-info');
        },
        clickOnItemInfo: function (e) {
            var self = this;
            if (tryToToggleCart(e, self.selectedItem)) {
                return;
            }
            tryToScale(e);
        },
        showNextItem: function () {
            var self = this;
            if (!self.nextItem) {
                return;
            }
            self.selectedItem = self.nextItem;
            Router.go(Router.state);
        },
        showPreviousItem: function () {
            var self = this;
            if (!self.previousItem) {
                return;
            }
            self.selectedItem = self.previousItem;
            Router.go(Router.state);
        },
        openMenu: function () {
            var self = this;
            self.selectedCategory = 'parent';
            Router.go('select-category');
        }
    }
})();

