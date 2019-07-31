// Generated by CoffeeScript 2.3.2
var Page, addCell, engineering, fixed, getElem, getField, hideCanvas, isNumeric, makeButton, makeDiv, makeInput, makeSpan, makeTextArea, showCanvas, storeAndGoto;

Page = class Page {
  constructor(columns, init) {
    this.columns = columns;
    this.init = init;
    this.table = getElem("table");
    this.actions = [];
  }

  addAction(title, f) {
    return this.actions.push([title, f]);
  }

  display() {
    var div, elem, f, i, j, len, ref, title;
    // actions
    if (this.actions.length > 0) {
      if (this.columns === 0) {
        this.columns = this.actions.length;
      }
      if (this.columns === 0) {
        this.columns = 1;
      }
      elem = getElem('myActions');
      elem.innerHTML = "";
      div = null;
      ref = this.actions;
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        [title, f] = ref[i];
        ((f) => {
          if (i % this.columns === 0) {
            div = document.createElement("div");
          }
          div.appendChild(makeButton(title, this.columns, f));
          if (i % this.columns === this.columns - 1) {
            return elem.appendChild(div);
          }
        })(f);
      }
      elem.appendChild(div);
    }
    this.table.innerHTML = "";
    return this.init();
  }

  addRow(a, b = null) {
    var tr;
    tr = document.createElement("tr");
    tr.width = '100%';
    if (b) {
      addCell(tr, a, b);
    } else {
      addCell(tr, a);
    }
    return this.table.appendChild(tr);
  }

};

// storeData = (data) -> localStorage[KEY] = JSON.stringify data
// fetchData = -> JSON.parse if localStorage[KEY] then localStorage[KEY] else '""'
storeAndGoto = function(data, page) {
  //storeData data
  return page.display();
};

isNumeric = function(val) {
  return val === Number(parseFloat(val));
};

getElem = function(id) {
  return document.getElementById(id);
};

hideCanvas = function() {
  var elem;
  elem = document.getElementById('myContainer');
  return elem.style.display = 'none';
};

showCanvas = function() {
  var elem;
  elem = document.getElementById('myContainer');
  return elem.style.display = 'block';
};

makeTextArea = function() {
  var b;
  b = document.createElement('textarea');
  //b.cols = 50
  b.style.position = 'fixed';
  b.style.top = '30px';
  b.style.width = 'calc(50vw - 0px)';
  b.style.height = 'calc(100vh - 30px)';
  b.style.resize = 'none';
  //b.style.whitespace = "nowrap"
  b.style.overflow = "visible";
  b.style.overflowScroll = true;
  //b.style.overflowX = "scroll"
  //b.style.overflowY = "scroll"
  b.nowrap = 'nowrap';
  b.wrap = 'off';
  b.rows = 200;
  b.style.fontSize = "100%";
  return b;
};

makeSpan = function(value) {
  var b;
  b = document.createElement('span');
  b.innerHTML = value;
  return b;
};

makeDiv = function(value) {
  var b;
  b = document.createElement('div');
  b.innerHTML = value;
  return b;
};

makeInput = function(title, value = '', readonly = false) {
  var b;
  b = document.createElement('input');
  b.id = title;
  b.value = value;
  b.placeholder = title;
  if (readonly) {
    b.setAttribute("readonly", true);
  }
  if (title === 'name') {
    b.autofocus = true;
  }
  b.onclick = "this.setSelectionRange(0, this.value.length)";
  return b;
};

makeButton = function(title, n, f) {
  var b;
  b = document.createElement('input');
  if (n === 0) {
    b.style.width = "100%";
    b.style.textAlign = 'left';
  } else {
    b.style.width = `${Math.floor(100 / n)}%`;
  }
  b.style.fontSize = "100%";
  b.style.fontFamily = 'monospace';
  b.style.webkitAppearance = "none";
  b.style.borderRadius = 0;
  b.style.padding = 0;
  b.type = 'button';
  b.value = title;
  b.onclick = f;
  return b;
};

addCell = function(tr, a, b = null) {
  var td;
  td = document.createElement("td");
  td.width = '100%';
  td.appendChild(a);
  if (b) {
    td.appendChild(b);
  }
  return tr.appendChild(td);
};

getField = function(name) {
  var element;
  element = document.getElementById(name);
  if (element) {
    return element.value;
  } else {
    return null;
  }
};

fixed = function(x, digits) {
  var factor;
  if (x === '') {
    return x;
  }
  if (x < 0) {
    return "-" + fixed(-x);
  }
  factor = 10 ** digits;
  return Math.round(x * factor) / factor;
};

engineering = function(x, digits) {
  var a, b, c, d, e, f, factor;
  if (x === '') {
    return x;
  }
  if (x < 0) {
    return "-" + engineering(-x);
  }
  a = Math.log10(x) / 3;
  b = a;
  c = Math.floor(b);
  d = b - c;
  e = 3 * c;
  f = 3 * d;
  x = 10 ** f;
  factor = 10 ** (digits - 1 - Math.floor(f));
  if (e === 0) {
    return Math.round(x * factor) / factor;
  } else {
    return Math.round(x * factor) / factor + 'E' + e;
  }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiLi4iLCJzb3VyY2VzIjpbImNvZmZlZVxcdXRpbHMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxJQUFBLElBQUEsRUFBQSxPQUFBLEVBQUEsV0FBQSxFQUFBLEtBQUEsRUFBQSxPQUFBLEVBQUEsUUFBQSxFQUFBLFVBQUEsRUFBQSxTQUFBLEVBQUEsVUFBQSxFQUFBLE9BQUEsRUFBQSxTQUFBLEVBQUEsUUFBQSxFQUFBLFlBQUEsRUFBQSxVQUFBLEVBQUE7O0FBQU0sT0FBTixNQUFBLEtBQUE7RUFFQyxXQUFjLFFBQUEsTUFBQSxDQUFBO0lBQUMsSUFBQyxDQUFBO0lBQVMsSUFBQyxDQUFBO0lBQ3pCLElBQUMsQ0FBQSxLQUFELEdBQVMsT0FBQSxDQUFRLE9BQVI7SUFDVCxJQUFDLENBQUEsT0FBRCxHQUFXO0VBRkU7O0VBSWQsU0FBWSxDQUFDLEtBQUQsRUFBUSxDQUFSLENBQUE7V0FBYyxJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBYyxDQUFDLEtBQUQsRUFBTyxDQUFQLENBQWQ7RUFBZDs7RUFFWixPQUFVLENBQUEsQ0FBQTtBQUVULFFBQUEsR0FBQSxFQUFBLElBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLEtBQUE7O0lBQUEsSUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDLE1BQVQsR0FBa0IsQ0FBckI7TUFDQyxJQUFHLElBQUMsQ0FBQSxPQUFELEtBQVUsQ0FBYjtRQUFvQixJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsT0FBeEM7O01BQ0EsSUFBRyxJQUFDLENBQUEsT0FBRCxLQUFVLENBQWI7UUFBb0IsSUFBQyxDQUFBLE9BQUQsR0FBVyxFQUEvQjs7TUFDQSxJQUFBLEdBQU8sT0FBQSxDQUFRLFdBQVI7TUFDUCxJQUFJLENBQUMsU0FBTCxHQUFpQjtNQUNqQixHQUFBLEdBQU07QUFDTjtNQUFBLEtB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QjtBQUpsQjs7QUFNUixXQUFBLEdBQWMsUUFBQSxDQUFDLENBQUQsRUFBRyxNQUFILENBQUE7QUFDYixNQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBO0VBQUEsSUFBRyxDQUFBLEtBQUssRUFBUjtBQUFnQixXQUFPLEVBQXZCOztFQUNBLElBQUcsQ0FBQSxHQUFJLENBQVA7QUFBYyxXQUFPLEdBQUEsR0FBTSxXQUFBLENBQVksQ0FBQyxDQUFiLEVBQTNCOztFQUNBLENBQUEsR0FBSSxJQUFJLENBQUMsS0FBTCxDQUFXLENBQVgsQ0FBQSxHQUFjO0VBQ2xCLENBQUEsR0FBSTtFQUNKLENBQUEsR0FBSSxJQUFJLENBQUMsS0FBTCxDQUFXLENBQVg7RUFDSixDQUFBLEdBQUksQ0FBQSxHQUFJO0VBQ1IsQ0FBQSxHQUFJLENBQUEsR0FBSTtFQUNSLENBQUEsR0FBSSxDQUFBLEdBQUk7RUFDUixDQUFBLEdBQUksRUFBQSxJQUFNO0VBQ1YsTUFBQSxHQUFTLEVBQUEsSUFBTSxDQUFDLE1BQUEsR0FBUyxDQUFULEdBQWEsSUFBSSxDQUFDLEtBQUwsQ0FBVyxDQUFYLENBQWQ7RUFDZixJQUFHLENBQUEsS0FBRyxDQUFOO1dBQ0MsSUFBSSxDQUFDLEtBQUwsQ0FBVyxDQUFBLEdBQUksTUFBZixDQUFBLEdBQXlCLE9BRDFCO0dBQUEsTUFBQTtXQUdDLElBQUksQ0FBQyxLQUFMLENBQVcsQ0FBQSxHQUFJLE1BQWYsQ0FBQSxHQUF5QixNQUF6QixHQUFrQyxHQUFsQyxHQUF3QyxFQUh6Qzs7QUFYYSIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jbGFzcyBQYWdlXHJcblxyXG5cdGNvbnN0cnVjdG9yIDogKEBjb2x1bW5zLCBAaW5pdCkgLT4gXHJcblx0XHRAdGFibGUgPSBnZXRFbGVtIFwidGFibGVcIlxyXG5cdFx0QGFjdGlvbnMgPSBbXVxyXG5cclxuXHRhZGRBY3Rpb24gOiAodGl0bGUsIGYpIC0+IEBhY3Rpb25zLnB1c2ggW3RpdGxlLGZdIFxyXG5cclxuXHRkaXNwbGF5IDogLT5cclxuXHRcdCMgYWN0aW9uc1xyXG5cdFx0aWYgQGFjdGlvbnMubGVuZ3RoID4gMFxyXG5cdFx0XHRpZiBAY29sdW1ucz09MCB0aGVuIEBjb2x1bW5zID0gQGFjdGlvbnMubGVuZ3RoIFxyXG5cdFx0XHRpZiBAY29sdW1ucz09MCB0aGVuIEBjb2x1bW5zID0gMVxyXG5cdFx0XHRlbGVtID0gZ2V0RWxlbSAnbXlBY3Rpb25zJ1xyXG5cdFx0XHRlbGVtLmlubmVySFRNTCA9IFwiXCJcclxuXHRcdFx0ZGl2ID0gbnVsbFxyXG5cdFx0XHRmb3IgW3RpdGxlLGZdLGkgaW4gQGFjdGlvbnNcclxuXHRcdFx0XHRkbyAoZikgPT5cclxuXHRcdFx0XHRcdGlmIGklQGNvbHVtbnM9PTAgdGhlbiBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiZGl2XCJcclxuXHRcdFx0XHRcdGRpdi5hcHBlbmRDaGlsZCBtYWtlQnV0dG9uIHRpdGxlLCBAY29sdW1ucywgZlxyXG5cdFx0XHRcdFx0aWYgaSVAY29sdW1ucz09QGNvbHVtbnMtMSB0aGVuIGVsZW0uYXBwZW5kQ2hpbGQgZGl2XHJcblx0XHRcdGVsZW0uYXBwZW5kQ2hpbGQgZGl2XHJcblxyXG5cdFx0QHRhYmxlLmlubmVySFRNTCA9IFwiXCIgXHJcblx0XHRAaW5pdCgpXHJcblx0XHRcdFx0XHJcblx0YWRkUm93IDogKGEsYj1udWxsKSAtPlxyXG5cdFx0dHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwidHJcIlxyXG5cdFx0dHIud2lkdGggPSAnMTAwJSdcclxuXHRcdGlmIGIgdGhlbiBhZGRDZWxsIHRyLGEsYlxyXG5cdFx0ZWxzZSBhZGRDZWxsIHRyLGFcclxuXHRcdEB0YWJsZS5hcHBlbmRDaGlsZCB0clxyXG5cclxuIyBzdG9yZURhdGEgPSAoZGF0YSkgLT4gbG9jYWxTdG9yYWdlW0tFWV0gPSBKU09OLnN0cmluZ2lmeSBkYXRhXHJcbiMgZmV0Y2hEYXRhID0gLT4gSlNPTi5wYXJzZSBpZiBsb2NhbFN0b3JhZ2VbS0VZXSB0aGVuIGxvY2FsU3RvcmFnZVtLRVldIGVsc2UgJ1wiXCInXHJcblxyXG5zdG9yZUFuZEdvdG8gPSAoZGF0YSxwYWdlKSAtPlxyXG5cdCNzdG9yZURhdGEgZGF0YVxyXG5cdHBhZ2UuZGlzcGxheSgpXHJcblxyXG5pc051bWVyaWMgPSAodmFsKSAtPiB2YWwgPT0gTnVtYmVyIHBhcnNlRmxvYXQgdmFsXHJcbmdldEVsZW0gPSAoaWQpIC0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIGlkXHJcblxyXG5oaWRlQ2FudmFzID0gLT5cclxuXHRlbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgJ215Q29udGFpbmVyJ1xyXG5cdGVsZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJ1x0XHRcclxuXHJcbnNob3dDYW52YXMgPSAtPlxyXG5cdGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCAnbXlDb250YWluZXInXHJcblx0ZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xyXG5cclxubWFrZVRleHRBcmVhID0gLT5cclxuXHRiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAndGV4dGFyZWEnXHJcblx0I2IuY29scyA9IDUwXHJcblx0Yi5zdHlsZS5wb3NpdGlvbiA9ICdmaXhlZCdcclxuXHRiLnN0eWxlLnRvcCA9ICczMHB4J1xyXG5cdGIuc3R5bGUud2lkdGggPSAnY2FsYyg1MHZ3IC0gMHB4KScgICAgICBcclxuXHRiLnN0eWxlLmhlaWdodD0gJ2NhbGMoMTAwdmggLSAzMHB4KSdcclxuXHRiLnN0eWxlLnJlc2l6ZT0gJ25vbmUnXHJcblxyXG5cdCNiLnN0eWxlLndoaXRlc3BhY2UgPSBcIm5vd3JhcFwiXHJcblx0Yi5zdHlsZS5vdmVyZmxvdyA9IFwidmlzaWJsZVwiXHJcblx0Yi5zdHlsZS5vdmVyZmxvd1Njcm9sbCA9IHRydWVcclxuXHQjYi5zdHlsZS5vdmVyZmxvd1ggPSBcInNjcm9sbFwiXHJcblx0I2Iuc3R5bGUub3ZlcmZsb3dZID0gXCJzY3JvbGxcIlxyXG5cdGIubm93cmFwPSdub3dyYXAnXHJcblx0Yi53cmFwPSdvZmYnXHJcblxyXG5cdGIucm93cz0yMDBcclxuXHRiLnN0eWxlLmZvbnRTaXplID0gXCIxMDAlXCJcclxuXHRiXHJcblxyXG5tYWtlU3BhbiA9ICh2YWx1ZSkgLT5cclxuXHRiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnc3BhbidcclxuXHRiLmlubmVySFRNTCA9IHZhbHVlXHJcblx0YlxyXG5cclxubWFrZURpdiA9ICh2YWx1ZSkgLT5cclxuXHRiID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnZGl2J1xyXG5cdGIuaW5uZXJIVE1MID0gdmFsdWVcclxuXHRiXHJcblxyXG5tYWtlSW5wdXQgPSAodGl0bGUsdmFsdWU9JycscmVhZG9ubHk9ZmFsc2UpIC0+XHJcblx0YiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgJ2lucHV0J1xyXG5cdGIuaWQgPSB0aXRsZVxyXG5cdGIudmFsdWUgPSB2YWx1ZVxyXG5cdGIucGxhY2Vob2xkZXIgPSB0aXRsZVxyXG5cdGlmIHJlYWRvbmx5IHRoZW4gYi5zZXRBdHRyaWJ1dGUgXCJyZWFkb25seVwiLCB0cnVlXHJcblx0aWYgdGl0bGU9PSduYW1lJyB0aGVuIGIuYXV0b2ZvY3VzID0gdHJ1ZVxyXG5cdGIub25jbGljayA9IFwidGhpcy5zZXRTZWxlY3Rpb25SYW5nZSgwLCB0aGlzLnZhbHVlLmxlbmd0aClcIlxyXG5cdGJcclxuXHJcbm1ha2VCdXR0b24gPSAodGl0bGUsbixmKSAtPlxyXG5cdGIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdpbnB1dCdcclxuXHRpZiBuPT0wXHJcblx0XHRiLnN0eWxlLndpZHRoID0gXCIxMDAlXCJcclxuXHRcdGIuc3R5bGUudGV4dEFsaWduID0gJ2xlZnQnXHJcblx0ZWxzZVxyXG5cdFx0Yi5zdHlsZS53aWR0aCA9IFwiI3tNYXRoLmZsb29yKDEwMC9uKX0lXCJcclxuXHRiLnN0eWxlLmZvbnRTaXplID0gXCIxMDAlXCJcclxuXHRiLnN0eWxlLmZvbnRGYW1pbHkgPSAnbW9ub3NwYWNlJ1xyXG5cdGIuc3R5bGUud2Via2l0QXBwZWFyYW5jZSA9IFwibm9uZVwiXHJcblx0Yi5zdHlsZS5ib3JkZXJSYWRpdXMgPSAwXHJcblx0Yi5zdHlsZS5wYWRkaW5nID0gMFxyXG5cdGIudHlwZSA9ICdidXR0b24nXHJcblx0Yi52YWx1ZSA9IHRpdGxlXHJcblx0Yi5vbmNsaWNrID0gZlxyXG5cdGJcclxuXHJcbmFkZENlbGwgPSAodHIsYSxiPW51bGwpIC0+XHJcblx0dGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwidGRcIlxyXG5cdHRkLndpZHRoID0gJzEwMCUnXHJcblx0dGQuYXBwZW5kQ2hpbGQgYVxyXG5cdGlmIGIgdGhlbiB0ZC5hcHBlbmRDaGlsZCBiXHJcblx0dHIuYXBwZW5kQ2hpbGQgdGRcclxuXHJcbmdldEZpZWxkID0gKG5hbWUpIC0+XHJcblx0ZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkIG5hbWVcclxuXHRpZiBlbGVtZW50IHRoZW4gZWxlbWVudC52YWx1ZSBlbHNlIG51bGxcclxuXHJcbmZpeGVkID0gKHgsZGlnaXRzKSAtPlxyXG5cdGlmIHggPT0gJycgdGhlbiByZXR1cm4geFxyXG5cdGlmIHggPCAwIHRoZW4gcmV0dXJuIFwiLVwiICsgZml4ZWQgLXhcclxuXHRmYWN0b3IgPSAxMCAqKiBkaWdpdHNcclxuXHRNYXRoLnJvdW5kKHggKiBmYWN0b3IpIC8gZmFjdG9yIFxyXG5cclxuZW5naW5lZXJpbmcgPSAoeCxkaWdpdHMpIC0+XHJcblx0aWYgeCA9PSAnJyB0aGVuIHJldHVybiB4XHJcblx0aWYgeCA8IDAgdGhlbiByZXR1cm4gXCItXCIgKyBlbmdpbmVlcmluZyAteFxyXG5cdGEgPSBNYXRoLmxvZzEwKHgpLzMgIFxyXG5cdGIgPSBhXHJcblx0YyA9IE1hdGguZmxvb3IgYiBcclxuXHRkID0gYiAtIGNcclxuXHRlID0gMyAqIGNcclxuXHRmID0gMyAqIGQgXHJcblx0eCA9IDEwICoqIGZcclxuXHRmYWN0b3IgPSAxMCAqKiAoZGlnaXRzIC0gMSAtIE1hdGguZmxvb3IgZilcclxuXHRpZiBlPT0wIFxyXG5cdFx0TWF0aC5yb3VuZCh4ICogZmFjdG9yKSAvIGZhY3RvciBcclxuXHRlbHNlXHJcblx0XHRNYXRoLnJvdW5kKHggKiBmYWN0b3IpIC8gZmFjdG9yICsgJ0UnICsgZVxyXG4iXX0=
//# sourceURL=c:\Lab\2018\008-Kalkyl\coffee\utils.coffee