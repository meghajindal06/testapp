angular.module('starter.controllers', [])

.controller('DashCtrl', function($http, $scope, $ionicLoading,Chats) {

    $scope.chats = Chats.all();
    $scope.chat = $scope.chats[0];

    $scope.dataObj = {
      "resourceType": "SepaCreditTransferPaymentInstruction",
      "accountNumberOrderingParty": "NL94ABNA07624865",
      "remittanceInfoType": "UNSTRUCTURED",
      "currency": "EUR"
    };



    
    $scope.validate = function(data){

      $scope.dataObj.executionDate = Date.parse($scope.dataObj.date);
       $http({
        method: "POST", 
        url: 'http://ec2-18-220-91-132.us-east-2.compute.amazonaws.com:8080/payval/single/sepa',
        data: $scope.dataObj,
        headers: {'Content-Type': 'application/json' , 'Accept' : 'application/json'}
      }).success(function(data, status, headers, config) {
      /*clear scope */
      
        $scope.errors = [];
         $ionicLoading.show({ template: 'Payment Validated', noBackdrop: true, duration: 2000 });
         
      }).error(function(data, status, headers, config){

        $scope.errors = [];
        for(var i=0;i<data.messages.length;i++){
          $scope.errors[data.messages[i].fieldName] = data.messages[i].messageText;
        }
        
        $ionicLoading.show({ template: 'Payment Validation failed', noBackdrop: true, duration: 2000 });
      });
    }
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
