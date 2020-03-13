export class Performance {
  static hasPerformanceApi () {
    const p = window.performance
    return p && p.mark && p.measure && p.clearMarks && p.clearMeasures
  }

  static mark (tag) {
    if (Performance.hasPerformanceApi()) {
      window.performance.mark(tag)
    }
  }

  static measure (name, from, to) {
    if (Performance.hasPerformanceApi()) {
      window.performance.measure(name, from, to)
      window.performance.clearMarks(from)
      window.performance.clearMarks(to)
    }
  }
}
