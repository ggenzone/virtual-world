class Graph {
  constructor(points = [], segments = []) {
    this.points = points
    this.segments = segments
  }

  static load(info) {
    const points = []
    const segments = []

    for(const pointInfo of info.points) {
      points.push(new Point(pointInfo.x, pointInfo.y))
    }

    for(const segmentInfo of info.segments) {
      segments.push(new Segment(
        points.find(p => p.equals(segmentInfo.p1)), 
        points.find(p => p.equals(segmentInfo.p2))
      ))
    }

    return new Graph(points, segments)
  }

  addPoint(point) {
    this.points.push(point)
  }

  containsPoint(point) {
    return this.points.find(p => p.equals(point))
  }

  tryAddPoint(point) {
    if (!this.containsPoint(point)) {
      this.addPoint(point)
      return true
    }

    return false
  }

  getSegmentsWithPoint(point) {
    const segs = []
    for (const seg of this.segments) {
      if (seg.includes(point)) {
        console.log('include: ', {seg})
        segs.push(seg)
      }
    }
    return segs
  }

  removePoint(point) {
    console.log('Remove point ', { point })
    const segs = this.getSegmentsWithPoint(point)
    console.log('Remove segments ', { segs })
    for (const seg of segs) {
      console.log(seg)
      this.removeSegment(seg)
    }
    this.points.splice(this.points.indexOf(point), 1)
  }

  addSegment(seg) {
    this.segments.push(seg)
  }

  containsSegment(seg) {
    return this.segments.find(s => s.equals(seg))
  }
  tryAddSegment(seg) {
    if (!this.containsSegment(seg) && !seg.p1.equals(seg.p2)) {
      this.addSegment(seg)
      return true
    }

    return false
  }

  removeSegment(seg) {
    this.segments.splice(this.segments.indexOf(seg), 1)
  }

  dispose(){
    this.segments.length = 0
    this.points.length = 0
  }

  draw(ctx) {
    for(const seg of this.segments) {
      seg.draw(ctx)
    }

    for(const point of this.points) {
      point.draw(ctx)
    }
  }
}