// /**
//   extensions is an Array and each item has such format:
//   {firstName: 'xxx', lastName: 'xxx', ext: 'xxx', extType: 'xxx'}
//   lastName, ext can be empty, extType can only has "DigitalUser", "VirtualUser","FaxUser","Dept","AO".
// **/

// /**
//   Question 1: sort extensions by "firstName" + "lastName" + "ext" ASC
// **/
// function sortExtensionsByName(extensions) {

// }


// /**
//   Question 2: sort extensions by extType follow these orders ASC
//   DigitalUser < VitrualUser < FaxUser < AO < Dept.
// **/
// function sortExtensionsByExtType(extensions) {

// }


// /**
//   saleItems is an Array has each item has such format:
//   {
//   month: n, //[1-12],
//   date: n, //[1-31],
//   transationId: "xxx",
//   salePrice: number
//   }
// **/

// /**
//   Question 3: write a function to calculate and return a list of total sales (sum) for each quarter, expected result like:
//   [
//     {quarter: 1, totalPrices: xxx, transactionNums: n},
//     {....}
//   ]
// **/

// function sumByQuarter(saleItems) {

// }

// /**
//   Question 4: write a function to calculate and return a list of average sales for each quarter, expected result like:
//   [
//     {quarter: 1, averagePrices: xxx, transactionNums: n},
//     {....}
//   ]
// **/

// function averageByQuarter(saleItems) {

// }


// /**
//   Question 5: please create a tool to generate Sequence
//   Expected to be used like:
//   var sequence1 = new Sequence();
//   sequence1.next() --> return 1;
//   sequence1.next() --> return 2;
  
//   in another module:
//   var sequence2 = new Sequence();
//   sequence2.next() --> 3;
//   sequence2.next() --> 4;
// **/




// /**
//     Question 6:
//     AllKeys: 0-9;
//     usedKeys: an array to store all used keys like [2,3,4];
//     We want to get an array which contains all the unused keys,in this example it would be: [0,1,5,6,7,8,9]
// **/

// function getUnUsedKeys(allKeys, usedKeys) {
//   //TODO
// }


/*
* 数据集合
* 基础数据保存 + 基本数据排序操作
*/
class ExtensionsSort {
  constructor (data = []) {
      this.data = data;
      this.extTypeList = ['DigitalUser', 'VirtualUser','FaxUser', 'AO', 'Dept'];
  }

  // 校验extType
  checkExtType (item) {
      if (this.extTypeList.indexOf(item) === -1) {
          console.log('extType can only has "DigitalUser", "VirtualUser","FaxUser","Dept","AO"');
          return false;
      }
      return true;
  }

  compareExtType (type1, type2, isAsc) {
      // extTypeList index越大优先级越高
      let idx1 = this.extTypeList.indexOf(type1);
      let idx2 = this.extTypeList.indexOf(type2);

      if (idx1 === -1 || idx2 === -1) {
          console.log('extType can only has "DigitalUser", "VirtualUser","FaxUser","Dept","AO"');
      }

      return this.compare(idx1, idx2, isAsc);
  }

 // 多属性比较
  compareAttrs (el1, el2, attrs) {
      // attrs: [{key: 'attr1', isAsc: false}]
      let res = [];
      let len = attrs.length;
      for (let i = 0; i < len; i++) {
          let val = this.compare(el1[attrs[i].key], el2[attrs[i].key], attrs[i].isAsc);
          res.push(val);
          if (val === 1 || val === -1) break;
      }
      
      for (let j = 0; j < res.length; j++) {
          if (res[j] === 1 || res[j] === -1) return res[j];
      }

      return 0;
  }

  compare (item1, item2, isAsc) {
      if (item1 > item2) {
          return (isAsc ? 1 : -1);
      } else if (item1 < item2) {
          return (isAsc ? -1 : 1);
      } else {
          return 0;
      }
  }

}


function sortExtensionsByName(extensions) {
  let es = new ExtensionsSort(extensions);
  let attrs = [
      {
          key: 'firstName',
          isAsc: true
      },
      {
          key: 'lastName',
          isAsc: true
      },
      {
          key: 'ext',
          isAsc: true
      }
  ]

  extensions.sort((a, b) => {
      return es.compareAttrs(a, b, attrs);
  });

  return extensions;
}

function sortExtensionsByExtType(extensions, isAsc = true) {
  let es = new ExtensionsSort(extensions);
  extensions.sort((a, b) => {
      return es.compareExtType(a, b, isAsc);
  });

  return extensions;
}