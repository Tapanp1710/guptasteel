import React, { useEffect, useMemo, useRef, useState } from 'react';
import './KanbanBoard.css';
import Card from '../Card/Card';
import KanbanCard from '../KanbanCard/KanbanCard';

export default function KanbanBoard({ title, subtitle, stages = [], items = [], onCardAction }) {
  const [boardItems, setBoardItems] = useState(items);
  const [draggedId, setDraggedId] = useState(null);
  const columnRefs = useRef({});

  useEffect(() => {
    setBoardItems(items);
  }, [items]);

  const grouped = useMemo(
    () => stages.map((stage) => ({ stage, cards: boardItems.filter((item) => item.stage === stage) })),
    [boardItems, stages],
  );

  function handleDrop(stage) {
    if (!draggedId) return;
    setBoardItems((current) =>
      current.map((item) => (item.id === draggedId ? { ...item, stage } : item)),
    );
    setDraggedId(null);
  }

  function handleAction(item, action) {
    if (onCardAction) {
      onCardAction(item, action);
    }
  }

  function scrollColumn(stage, direction) {
    const column = columnRefs.current[stage];
    if (!column) return;

    column.scrollBy({
      top: direction * Math.max(column.clientHeight * 0.75, 220),
      behavior: 'smooth',
    });
  }

  return (
    <Card title={title} subtitle={subtitle}>
      <div className="kanban-board">
        {grouped.map(({ stage, cards }) => (
          <section
            key={stage}
            className="kanban-board__column"
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => handleDrop(stage)}
          >
            <div className="kanban-board__column-head">
              <div>
                <h3>{stage}</h3>
                <span>{cards.length} activities</span>
              </div>
              {cards.length > 1 ? (
                <div className="kanban-board__controls">
                  <button type="button" onClick={() => scrollColumn(stage, -1)} aria-label={`Scroll ${stage} up`}>
                    ↑
                  </button>
                  <button type="button" onClick={() => scrollColumn(stage, 1)} aria-label={`Scroll ${stage} down`}>
                    ↓
                  </button>
                </div>
              ) : null}
            </div>
            <div className="kanban-board__column-body" ref={(element) => { columnRefs.current[stage] = element; }}>
              {cards.map((item) => (
                <KanbanCard
                  key={item.id}
                  item={item}
                  onDragStart={() => setDraggedId(item.id)}
                  onAction={handleAction}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </Card>
  );
}
