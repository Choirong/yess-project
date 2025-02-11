function applyChanges(content, changes) {
    // console.log('Original content:', content); // 디버깅 로그
    // console.log('Changes to apply:', changes); // 디버깅 로그

    let updatedContent = content;

    try {
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
    } catch (error) {
        console.error('Error applying changes:', error); // 에러 로그
        throw new Error('Failed to apply changes');
    }

    return updatedContent;
}

function adjustChangesForConflict(currentContent, currentVersion, clientVersion, changes) {
    let adjustedChanges = [];

    changes.forEach(change => {
        const { position, insertString, deleteCount } = change;

        let adjustedPosition = position;

        if (clientVersion < currentVersion) {
            adjustedPosition = position;
        }

        adjustedChanges.push({
            position: adjustedPosition,
            insertString,
            deleteCount,
        });
    });

    return adjustedChanges;
}

module.exports = { applyChanges, adjustChangesForConflict };
