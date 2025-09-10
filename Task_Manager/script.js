document.getElementById('addTaskBtn').onclick = function() {
  var input = document.getElementById('taskInput');
  var text = input.value.trim();
  if (text) {
    addTask(text);
    input.value = '';
  }
};

function addTask(text) {
  var li = document.createElement('li');
  var span = document.createElement('span');
  span.textContent = text;

  function createEditBtn() {
    var editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = function() {
      startEdit();
    };
    return editBtn;
  }

  function createRemoveBtn() {
    var removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = function() {
      li.remove();
    };
    return removeBtn;
  }

  function startEdit() {
    var input = document.createElement('input');
    input.type = 'text';
    input.value = span.textContent;

    var saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.onclick = function() {
      span.textContent = input.value.trim() || span.textContent;
      li.replaceChild(span, input);
      li.replaceChild(createEditBtn(), saveBtn);
      li.replaceChild(createRemoveBtn(), cancelBtn);
    };

    var cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.onclick = function() {
      li.replaceChild(span, input);
      li.replaceChild(createEditBtn(), saveBtn);
      li.replaceChild(createRemoveBtn(), cancelBtn);
    };

    li.replaceChild(input, span);
    li.replaceChild(saveBtn, li.children[1]);
    li.replaceChild(cancelBtn, li.children[2]);
    input.focus();
  }

  li.appendChild(span);
  li.appendChild(createEditBtn());
  li.appendChild(createRemoveBtn());
  document.getElementById('taskList').appendChild(li);
} 