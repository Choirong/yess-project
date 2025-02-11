function applyChanges(content, changes) {
    let updatedContent = content;

    changes.forEach(change => {
        const { position, insertString, deleteCount } = change;

        if (deleteCount > 0) {
            updatedContent =
                updatedContent.slice(0, position) +
                updatedContent.slice(position + deleteCount);
        }

        if (insertString) {
            updatedContent =
                updatedContent.slice(0, position) +
                insertString +
                updatedContent.slice(position);
        }
    });

    return updatedContent;
}

module.exports = { applyChanges };
