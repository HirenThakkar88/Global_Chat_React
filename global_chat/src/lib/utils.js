// utils.js
export const groupMessagesByDate = (messages) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to midnight for comparison

  return messages.reduce((groups, message) => {
    const messageDate = new Date(message.createdAt);
    messageDate.setHours(0, 0, 0, 0); // Compare dates without time

    const diffDays = Math.round((today - messageDate) / (1000 * 60 * 60 * 24));
    
    let dateLabel;
    if (diffDays === 0) {
      dateLabel = 'Today';
    } else if (diffDays === 1) {
      dateLabel = 'Yesterday';
    } else {
      dateLabel = messageDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }

    if (!groups[dateLabel]) {
      groups[dateLabel] = [];
    }
    groups[dateLabel].push(message);
    return groups;
  }, {});
};

// Your existing time formatter
export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}