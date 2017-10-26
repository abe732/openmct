/*****************************************************************************
 * Open MCT, Copyright (c) 2014-2017, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/

define(
    [],
    function () {

        /**
         * The ElementsController prepares the elements view for display
         *
         * @constructor
         */
        function ElementsController($scope) {
            this.scope = $scope;
            this.scope.composition = [];
            var self = this;

            function filterBy(text) {
                if (typeof text === 'undefined') {
                    return $scope.searchText;
                } else {
                    $scope.searchText = text;
                }
            }

            function searchElements(value) {
                if ($scope.searchText) {
                    return value.getModel().name.toLowerCase().search(
                            $scope.searchText.toLowerCase()) !== -1;
                } else {
                    return true;
                }
            }

            function setSelection(selection) {
                self.scope.selection = selection;
                self.refreshComposition();
            }

            $scope.filterBy = filterBy;
            $scope.searchElements = searchElements;

            openmct.selection.on('change', setSelection);
            setSelection(openmct.selection.get());

            $scope.$on("$destroy", function () {
                openmct.selection.off("change", setSelection);
            });
        }

        // ElementsController.prototype.setSelection = function (selection) {
        //     this.scope.selection = selection;
        //     this.refreshComposition();
        // };

        ElementsController.prototype.refreshComposition = function () {
            var selection = this.scope.selection[0];
            if (!selection) {
                return;
            }

            // var composition = selection.item.composition;
            // this.scope.composition = composition;
            // this.scope.composition = selection.oldItem.getCapability('composition');

            selection.oldItem.useCapability('composition').then(function (composition) {
                    this.scope.composition = composition;                    
            }.bind(this));
        };

        return ElementsController;
    }
);
