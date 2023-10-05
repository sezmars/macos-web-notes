/*  *******************************************************
    By sezmars - 2023
    MIT Licence - https://choosealicense.com/licenses/mit/

    https://github.com/sezmars/highlightTextarea
    *******************************************************/

export class TextHighlight {
  private readonly origBkgColor: string
  private readonly ele: HTMLTextAreaElement
  private searchArg: string
  private sensitive: boolean
  private word: boolean
  private sel: number
  private readonly container: HTMLDivElement
  private readonly backdrop: HTMLDivElement
  private readonly hilite: HTMLDivElement
  private readonly observer: ResizeObserver
  private readonly handlers: {
        input: () => void;
        scroll: () => void;
    }

  constructor (ele: HTMLTextAreaElement) {
    if (ele.tagName !== 'TEXTAREA') {
      throw Object.assign(
        new Error('The element must be a textarea')
      )
    }

    const styles = window.getComputedStyle(ele)
    this.origBkgColor = styles.backgroundColor
    this.ele = ele
    this.searchArg = ''
    this.sensitive = false
    this.word = false
    this.sel = -1

    this.handlers = {
      input: this.inputHandler.bind(this),
      scroll: this.scrollHandler.bind(this)
    }

    this.ele.classList.add('hlta-textarea')
    this.ele.addEventListener('input', this.handlers.input)
    this.ele.addEventListener('scroll', this.handlers.scroll)

    const nodeCont = document.createElement('div')
    nodeCont.classList.add('hlta-container')
    this.container = nodeCont

    const nodeBack = document.createElement('div')
    nodeBack.classList.add('hlta-backdrop')
    this.backdrop = nodeBack

    const nodeHilite = document.createElement('div')
    nodeHilite.classList.add('hlta-highlight')
    this.hilite = nodeHilite

        this.ele.parentNode!.insertBefore(nodeCont, this.ele.nextSibling)
        this.backdrop.append(this.hilite)
        this.container.append(this.backdrop)
        this.container.appendChild(this.ele)

        this.observer = new ResizeObserver(this.resizeObs.bind(this))
        this.observer.observe(this.ele)
        this.inputHandler()
  }

  search (arg: string, sensitive: boolean, word: boolean) {
    this.searchArg = arg
    this.sensitive = !!sensitive
    this.word = !!word
    this.inputHandler()
    this.sel = -1
    this.next()
  }

  next () {
    this.sel += 1
    this.setSelection(true)
  }

  prev () {
    this.sel -= 1
    this.setSelection(true)
  }

  count () {
    const eles = this.hilite.querySelectorAll('mark')
    return eles.length
  }

  clear () {
    this.searchArg = ''
    this.hilite.innerHTML = this.hilite.textContent!
    this.sel = -1
  }

  destroy () {
    this.ele.removeEventListener('input', this.handlers.input)
    this.ele.removeEventListener('scroll', this.handlers.scroll)
    this.observer.disconnect()

        this.container.parentNode!.insertBefore(this.ele, this.container)
        while (this.container.firstChild) {
          this.container.removeChild(this.container.lastChild!)
        }
        this.container.remove()
  }

  private resizeObs () {
    const styles = window.getComputedStyle(this.ele)
    const width = this.ele.scrollWidth
    const height = this.ele.offsetHeight - 20

    this.backdrop.style.cssText = `width: ${width}px; height: ${height}px; margin: ${styles.marginTop} ${styles.marginRight} ${styles.marginBottom} ${styles.marginLeft};
                   background-color: ${this.origBkgColor}`
    this.copyStyles(this.ele, this.hilite, [
      'width',
      'paddingLeft',
      'paddingRight',
      'paddingTop',
      'paddingBottom',
      'borderTop',
      'letterSpacing',
      'borderLeft',
      'borderRight',
      'borderBottom',
      'fontFamily',
      'fontSize',
      'fontWeight',
      'lineHeight'
    ])
    this.hilite.style.minHeight = styles.height
    this.hilite.style.whiteSpace = 'pre-wrap'
  }

  private inputHandler () {
    this.hilite.innerHTML = this.markText()
    this.scrollHandler()
    if (this.sel > -1) {
      this.setSelection()
    }
  }

  private copyStyles (src: HTMLElement, dest: HTMLElement, styles2Copy: string[]) {
    const styles = window.getComputedStyle(src)
    styles2Copy.forEach((stl: any) => (dest.style[stl] = styles[stl]))
  }

  private markText () {
    const txt = this.ele.value.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    if (this.searchArg) {
      const searchArg = this.searchArg.replace(/</g, '&lt;').replace(/>/g, '&gt;')
      const boundary = this.word ? '\\b' : ''

      const re = new RegExp(boundary + '(' + this.escapeString(searchArg) + ')' + boundary, 'g' + (this.sensitive ? '' : 'i'))
      return txt.replace(re, '<mark>$&</mark>')
    } else {
      return txt
    }
  }

  private escapeString (txt: string) {
    const specials = ['-', '[', ']', '/', '{', '}', '(', ')', '*', '+', '?', '.', '\\', '^', '$', '|']
    return txt.replace(RegExp('[' + specials.join('\\') + ']', 'g'), '\\$&')
  }

  private scrollHandler () {
    this.backdrop.scrollTop = this.ele.scrollTop || 0
    const sclLeft = this.ele.scrollLeft
    this.backdrop.style.transform = sclLeft > 0 ? 'translateX(' + -sclLeft + 'px)' : ''
  }

  private setSelection (scroll?: boolean) {
    const eles = this.hilite.querySelectorAll('mark')
    const len = eles.length

    if (this.sel >= len) {
      this.sel = 0
    }
    if (this.sel < 0) {
      this.sel = len - 1
    }

    for (let i = 0; i < len; ++i) {
      if (i === this.sel) {
        eles[i].classList.add('sel')
        if (scroll) {
          this.ele.scrollTop = eles[i].offsetTop > 10 ? eles[i].offsetTop - 10 : eles[i].offsetTop
        }
      } else {
        eles[i].classList.remove('sel')
      }
    }
  }
}
