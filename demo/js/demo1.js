import QuillBetterTable from 'src/quill-better-table-plus.js'
// import better-table styles file
import 'src/assets/quill-better-table-plus.scss'

Quill.register({
  'modules/better-table': QuillBetterTable
}, true)

window.onload = () => {
  const quill = new Quill('#editor-wrapper', {
    theme: 'snow',
    modules: {
      table: false,
      'better-table': {
        operationMenu: {
          items: {
            unmergeCells: {
              text: 'Another unmerge cells name'
            }
          },

          color: {
            colors: ['red', 'green', 'yellow', 'white', 'red', 'green', 'yellow', 'white']
          }
        }
      },
      keyboard: {
        bindings: QuillBetterTable.keyboardBindings
      }
    }
  })

  let tableModule = quill.getModule('better-table')
  document.body.querySelector('#insert-table')
    .onclick = () => {
      tableModule.insertTable(3, 3)
    }

  document.body.querySelector('#get-table')
    .onclick = () => {
      console.log(tableModule.getTable())
    }

  document.body.querySelector('#get-contents')
    .onclick = () => {
      console.log(quill.getContents())
    }

  document.body.querySelector('#insert-column-right')
    .onclick = () => {
    tableModule.insertColumnRight()
  }

  document.body.querySelector('#insert-column-left')
    .onclick = () => {
    tableModule.insertColumnLeft()
  }

  document.body.querySelector('#insert-row-above')
    .onclick = () => {
    tableModule.insertRowAbove()
  }

  document.body.querySelector('#insert-row-below')
    .onclick = () => {
    tableModule.insertRowBelow()
  }

  document.body.querySelector('#delete-column')
    .onclick = () => {
    tableModule.deleteColumn()
  }

  document.body.querySelector('#delete-row')
    .onclick = () => {
    tableModule.deleteRow()
  }

  document.body.querySelector('#delete-table')
    .onclick = () => {
    tableModule.deleteTable()
  }
}
