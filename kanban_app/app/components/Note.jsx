import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import {reactiveComponent} from 'mobservable';
import ItemTypes from './ItemTypes';

const noteSource = {
  beginDrag(props) {
    return {
      data: props.data
    };
  }
};

const noteTarget = {
  hover(targetProps, monitor) {
    const targetData = targetProps.data;
    const sourceProps = monitor.getItem();
    const sourceData = sourceProps.data;

    if(sourceData.id !== targetData.id) {
      targetProps.onMove({sourceData, targetData});
    }
  }
};

@DragSource(ItemTypes.NOTE, noteSource, (connect) => ({
  connectDragSource: connect.dragSource()
}))
@DropTarget(ItemTypes.NOTE, noteTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@reactiveComponent
export default class Note extends React.Component {
  render() {
    const {connectDragSource, connectDropTarget,
      onMove, data, ...props} = this.props;

    return connectDragSource(connectDropTarget(
      <li {...props}>{props.children}</li>
    ));
  }
}
