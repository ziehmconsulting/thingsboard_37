/**
 * Copyright © 2016-2023 The Thingsboard Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.thingsboard.server.dao.notification.cache;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.thingsboard.server.common.data.id.EntityId;
import org.thingsboard.server.common.data.id.NotificationRuleId;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NotificationRequestCacheKey implements Serializable {

    private static final long serialVersionUID = 59871139005482170L;

    private EntityId originatorEntityId;
    private NotificationRuleId ruleId;

    @Override
    public String toString() {
        return ruleId + "_" + originatorEntityId;
    }

}
