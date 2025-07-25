import {
  AgentStatus,
  CallDirection,
  ChannelState,
  ChannelType,
  EngineRoutingSchemaType,
} from 'webitel-sdk';

import {
  AdminSections,
  AuditorSections,
  ChatGatewayProvider,
  CrmSections,
  IconAction,
  QueueType,
  RelativeDatetimeValue,
  SupervisorSections,
  WebitelApplications,
} from '../../enums';
import { AccessMode } from '../../modules/ObjectPermissions/_internals/enums/AccessMode.enum.js';
import { snakeToCamel } from '../../scripts';

export default {
  // describes reusable buttons, actions, default titles, and other ui elements
  reusable: {
    comment: 'Bình luận',
    replace: 'Thay thế',
    download: 'Tải xuống',
    history: 'Lịch sử',
    filter: ({ plural }) => plural(['Bộ lọc', 'Các bộ lọc']),
    total: 'Tổng cộng',
    ok: 'Đồng ý',
    object: 'Đối tượng',
    save: 'Lưu',
    saveAs: 'Lưu như',
    saved: 'Đã lưu',
    send: 'Gửi',
    start: 'Bắt đầu',
    close: 'Đóng',
    add: 'Thêm',
    cancel: 'Hủy',
    import: 'Nhập',
    export: 'Xuất',
    true: 'Đúng',
    title: 'Tiêu đề',
    position: 'Vị trí',
    delete: 'Xóa',
    search: 'Tìm kiếm',
    open: 'Mở',
    name: 'Tên',
    expand: 'Mở rộng',
    collapse: 'Thu gọn',
    generate: 'Tạo',
    lang: {
      en: 'Tiếng Anh',
      es: 'Tiếng Tây Ban Nha',
      ru: 'Tiếng Nga',
      uk: 'Tiếng Ukraina',
      kz: 'Tiếng Kazakh',
    },
    from: 'Từ',
    to: 'Đến',
    tts: 'Chuyển văn bản thành giọng nói',
    state: 'Trạng thái',
    refresh: 'Làm mới',
    retry: 'Thử lại',
    downloadAll: 'Tải xuống tất cả',
    warning: 'Cảnh báo',
    doNotSave: 'Không lưu',
    required: 'Bắt buộc',
    copy: 'Sao chép',
    new: 'Mới',
    createdAt: 'Tạo lúc',
    createdBy: 'Tạo bởi',
    modifiedAt: 'Sửa lúc',
    modifiedBy: 'Sửa bởi',
    general: 'Chung',
    generalInfo: 'Thông tin chung',
    all: 'Tất cả {entity}',
    upload: 'Tải lên',
    edit: 'Sửa',
    back: 'Quay lại',
    step: 'Bước { count }',
    more: 'Thêm',
    read: 'Đọc',
    create: 'Tạo mới',
    update: 'Cập nhật',
    draggable: 'Có thể kéo thả',
    unassigned: 'Chưa được gán',
    showUnassigned: 'Hiển thị chưa được gán',
    group: 'Nhóm',
    updatedBy: (/*{ named }*/) => {
      return 'Đã sửa';
    },
  },
  // yak zhe ya zaebalsya povtoriaty odni i ti sami slova!!!!
  vocabulary: {
    apply: 'Áp dụng',
    language: 'Ngôn ngữ',
    voice: 'Giọng nói',
    format: 'Định dạng',
    text: 'Văn bản',
    yes: 'Có',
    no: 'Không',
    description: 'Mô tả',
    login: 'Đăng nhập',
    host: 'Máy chủ',
    time: 'Thời gian',
    channel: 'Kênh | Các kênh',
    file: 'Tệp',
    logout: 'Đăng xuất',
    priority: 'Mức độ ưu tiên | Mức độ ưu tiên',
    color: 'Màu sắc',
    variables: 'Biến | Các biến',
    type: 'Loại',
    tag: 'Thẻ | Các thẻ',
    output: 'Đầu ra | Các đầu ra',
    values: 'Giá trị | Các giá trị',
    keys: 'Khóa | Các khóa',
    duration: 'Thời lượng',
    reset: 'Đặt lại',
    errors: 'Lỗi | Các lỗi',
    labels: 'Nhãn | Các nhãn',
    permissions: 'Quyền | Các quyền',
    options: 'Tùy chọn | Các tùy chọn',
    emails: 'Email | Các email',
    phones: 'Điện thoại | Các điện thoại',
    messaging: 'Nhắn tin',
    emptyResultSearch: 'Không tìm thấy kết quả nào',
    contact: 'Liên hệ | Các liên hệ',
    column: 'Cột | Các cột',
    notification: 'Thông báo | Các thông báo',
  },
  // date-related texts
  date: {
    sec: 'Giây',
    timezone: 'Múi giờ | Các múi giờ',
  },
  // locales, related to user access, permissions, etc.
  access: {
    ObAC: 'Quản lý theo thao tác',
    RbAC: 'Quản lý theo bản ghi',
    operations: 'Các thao tác',
    rbacDefault: 'Mặc định truy cập dựa trên bản ghi',
    accessMode: {
      [AccessMode.FORBIDDEN]: 'Cấm',
      [AccessMode.ALLOW]: 'Cho phép',
      [AccessMode.MANAGE]: 'Cho phép với ủy quyền',
    },
  },
  // describes Webitel system entities
  objects: {
    team: 'Nhóm | Các nhóm',
    supervisor: 'Giám sát viên | Các giám sát viên',
    auditor: 'Kiểm toán viên | Các kiểm toán viên',
    region: 'Khu vực | Các khu vực',
    communicationType: 'Loại giao tiếp | Các loại giao tiếp',
    grantee: 'Người được cấp quyền | Những người được cấp quyền',
    grantor: 'Người cấp quyền | Những người cấp quyền',
    role: 'Vai trò | Các vai trò',
    user: 'Người dùng | Các người dùng',
    list: 'Danh sách | Các danh sách',
    contact: 'Liên hệ | Các liên hệ',
    case: 'Trường hợp | Các trường hợp',
    calendar: 'Lịch | Các lịch',
    direction: 'Hướng',
    gateway: 'Cổng kết nối | Các cổng kết nối',
    hangupCause: 'Nguyên nhân ngắt máy',
    hasOption: 'Có tùy chọn',
    hasRecording: 'Ghi âm',
    amdResult: 'Kết quả AMD',
    ratedBy: 'Được đánh giá bởi',
    talkDuration: 'Thời lượng đàm thoại',
    totalDuration: 'Tổng thời lượng',
    transcription: 'Bản ghi',
    attachment: 'Tệp đính kèm | Các tệp đính kèm',
    owner: 'Chủ sở hữu | Các chủ sở hữu',
    queue: {
      queue: 'Hàng chờ | Hàng chờ',
      type: {
        [QueueType.INBOUND_QUEUE]: 'Hàng chờ cuộc gọi vào',
        [QueueType.OFFLINE_QUEUE]: 'Hàng chờ ngoại tuyến',
        [QueueType.OUTBOUND_IVR_QUEUE]: 'Hàng chờ IVR gọi ra',
        [QueueType.PREDICTIVE_DIALER]: 'Quay số dự đoán',
        [QueueType.PROGRESSIVE_DIALER]: 'Quay số tiến bộ',
        [QueueType.PREVIEW_DIALER]: 'Quay số xem trước',
        [QueueType.CHAT_INBOUND_QUEUE]: 'Hàng chờ chat',
        [QueueType.INBOUND_JOB_QUEUE]: 'Hàng chờ tác vụ vào',
        [QueueType.OUTBOUND_JOB_QUEUE]: 'Hàng chờ tác vụ ra',
      },
    },
    agent: {
      agent: 'Tổng đài viên | Tổng đài viên',
      status: {
        [AgentStatus.Online]: 'Trực tuyến',
        [AgentStatus.Pause]: 'Tạm dừng',
        [AgentStatus.Offline]: 'Ngoại tuyến',
        [snakeToCamel(AgentStatus.BreakOut)]: 'Giải lao',
      },
    },
    flow: {
      name: 'Sơ đồ luồng | Sơ đồ luồng',
      type: {
        [EngineRoutingSchemaType.Chat]: 'Chat',
        [EngineRoutingSchemaType.Voice]: 'Thoại',
        [EngineRoutingSchemaType.Service]: 'Dịch vụ',
        [EngineRoutingSchemaType.Processing]: 'Biểu mẫu',
      },
    },
    messengers: {
      [ChatGatewayProvider.TELEGRAM_BOT]: 'Bot Telegram',
      [ChatGatewayProvider.TELEGRAM_APP]: 'Ứng dụng Telegram',
      [ChatGatewayProvider.MESSENGER]: 'Meta',
      [ChatGatewayProvider.VIBER]: 'Viber',
      [ChatGatewayProvider.WEBCHAT]: 'Web chat',
      [ChatGatewayProvider.INFOBIP]: 'Infobip',
      [ChatGatewayProvider.CUSTOM]: 'Cổng kết nối chat tùy chỉnh',
    },
    quickReplies: {
      quickReplies: 'Trả lời nhanh | Trả lời nhanh',
      quickRepliesEmpty: 'Chưa có trả lời nhanh nào',
    },
  },
  channel: {
    state: {
      [ChannelState.Waiting]: 'Đang chờ',
      [ChannelState.Distribute]: 'Phân phối',
      [ChannelState.Offering]: 'Đang đề nghị',
      [ChannelState.Answered]: 'Đã trả lời',
      [ChannelState.Active]: 'Đang hoạt động',
      [ChannelState.Bridged]: 'Đã kết nối',
      [ChannelState.Hold]: 'Tạm giữ',
      [ChannelState.Missed]: 'Nhỡ',
      [snakeToCamel(ChannelState.WrapTime)]: 'Thời gian kết thúc',
      [ChannelState.Processing]: 'Đang xử lý',
      [ChannelState.Transfer]: 'Chuyển tiếp',
    },
    type: {
      [ChannelType.Call]: 'Cuộc gọi',
      [ChannelType.Email]: 'Email',
      [ChannelType.Chat]: 'Chat',
      [ChannelType.Job]: 'Tác vụ',
    },
  },
  calls: {
    direction: {
      [CallDirection.Inbound]: 'Gọi vào',
      [CallDirection.Outbound]: 'Gọi ra',
    },
  },
  cases: {
    status: 'Trạng thái',
    source: 'Nguồn',
    author: 'Tác giả',
    reporter: 'Người báo cáo',
    impacted: 'Bị ảnh hưởng',
    assignee: 'Người được giao',
    groupPerformers: 'Nhóm',
    reason: 'Lý do | Lý do',
    rating: 'Đánh giá',
    service: 'Dịch vụ | Dịch vụ',
    selectAService: 'Chọn một dịch vụ',
    appliedSLA: 'SLA đã áp dụng',
    appliedCondition: 'Điều kiện đã áp dụng',
    reactionTime: 'Thời gian phản hồi',
    resolutionTime: 'Thời gian giải quyết',
    actualReactionTime: 'Thời gian phản hồi thực tế',
    actualResolutionTime: 'Thời gian giải quyết thực tế',
  },
  // describes Webitel FRONTEND applications + their navs
  WebitelApplications: {
    [WebitelApplications.AGENT]: {
      name: 'Không gian làm việc của tổng đài viên',
    },
    [WebitelApplications.AUDIT]: {
      name: 'Kiểm toán',
      sections: {
        [AuditorSections.Scorecards]: 'Bảng điểm',
      },
    },
    [WebitelApplications.CRM]: {
      name: 'CRM',
      sections: {
        [CrmSections.Contacts]: 'Danh bạ',
        [CrmSections.Cases]: 'Hỗ trợ',
        [CrmSections.Priorities]: 'Mức độ ưu tiên',
        [CrmSections.CloseReasonGroups]: 'Lý do kết thúc',
        [CrmSections.Statuses]: 'Trạng thái',
        [CrmSections.Slas]: 'SLA',
        [CrmSections.ServiceCatalogs]: 'Danh mục dịch vụ',
        [CrmSections.Sources]: 'Nguồn hỗ trợ',
        [CrmSections.ContactGroups]: 'Nhóm liên hệ',
      },
    },
    [WebitelApplications.HISTORY]: { name: 'Lịch sử cuộc gọi' },
    [WebitelApplications.ANALYTICS]: { name: 'Công cụ trực quan hóa dữ liệu' },
    [WebitelApplications.SUPERVISOR]: {
      name: 'Không gian làm việc của giám sát viên',
      sections: {
        [SupervisorSections.Queues]: 'Hàng chờ',
        [SupervisorSections.Agents]: 'Tổng đài viên',
        [SupervisorSections.ActiveCalls]: 'Cuộc gọi đang diễn ra',
      },
    },
    [WebitelApplications.ADMIN]: {
      name: 'Quản trị',
      sections: {
        [AdminSections.Users]: 'Người dùng',
        [AdminSections.License]: 'Giấy phép',
        [AdminSections.Devices]: 'Thiết bị',
        [AdminSections.Flow]: 'Sơ đồ luồng',
        [AdminSections.Dialplan]: 'Kế hoạch gọi',
        [AdminSections.Gateways]: 'Cổng kết nối',
        [AdminSections.Chatplan]: 'Kế hoạch chat',
        [AdminSections.ChatGateways]: 'Cổng kết nối chat',
        [AdminSections.Skills]: 'Kỹ năng tổng đài viên',
        [AdminSections.Buckets]: 'Vùng chứa',
        [AdminSections.Media]: 'Tệp đa phương tiện',
        [AdminSections.ShiftTemplates]: 'Mẫu ca làm việc',
        [AdminSections.PauseTemplates]: 'Mẫu tạm dừng',
        [AdminSections.WorkingConditions]: 'Điều kiện làm việc',
        [AdminSections.Blacklist]: 'Danh sách',
        [AdminSections.Calendars]: 'Lịch',
        [AdminSections.Regions]: 'Địa điểm',
        [AdminSections.Communications]: 'Loại giao tiếp',
        [AdminSections.PauseCause]: 'Trạng thái tổng đài viên',
        [AdminSections.Agents]: 'Tổng đài viên',
        [AdminSections.Teams]: 'Nhóm',
        [AdminSections.Resources]: 'Tài nguyên',
        [AdminSections.ResourceGroups]: 'Nhóm tài nguyên',
        [AdminSections.Queues]: 'Hàng chờ',
        [AdminSections.Storage]: 'Lưu trữ',
        [AdminSections.StoragePolicies]: 'Chính sách lưu trữ',
        [AdminSections.CognitiveProfiles]: 'Hồ sơ nhận thức',
        [AdminSections.EmailProfiles]: 'Hồ sơ email',
        [AdminSections.SingleSignOn]: 'Đăng nhập một lần',
        [AdminSections.ImportCsv]: 'Nhập từ tệp CSV',
        [AdminSections.Triggers]: 'Kích hoạt',
        [AdminSections.Media]: 'Tệp đa phương tiện',
        [AdminSections.Roles]: 'Vai trò',
        [AdminSections.Objects]: 'Đối tượng',
        [AdminSections.Changelogs]: 'Nhật ký thay đổi',
        [AdminSections.Configuration]: 'Cấu hình',
        [AdminSections.GlobalVariables]: 'Biến toàn cục',
        [AdminSections.QuickReplies]: 'Trả lời nhanh',
      },
    },
  },
  validation: {
    required: 'Trường bắt buộc',
    numeric: 'Phải là số',
    email: 'Phải là email',
    gatewayHostValidator: 'Phải là IPv4 hoặc FQDN',
    sipAccountValidator: 'Phải là tài khoản SIP',
    ipValidator: 'Phải là IPv4',
    macValidator: 'Phải là MAC',
    minValue: ({ named }) => {
      let text = 'Giá trị không được nhỏ hơn';
      if (named('min')) {
        text += ` ${named('min')}`;
      }
      return text;
    },
    maxValue: ({ named }) => {
      let text = 'Giá trị không được lớn hơn';
      if (named('max')) {
        text += ` ${named('max')}`;
      }
      return text;
    },
    minLength: ({ named }) => {
      let text = 'Độ dài không được nhỏ hơn';
      if (named('min')) {
        text += ` ${named('min')}`;
      }
      return text;
    },
    maxLength: ({ named }) => {
      let text = 'Độ dài không được lớn hơn';
      if (named('max')) {
        text += ` ${named('max')}`;
      }
      return text;
    },
    sameAs: 'Mật khẩu không đúng',
    requiredArrayValue: 'Mảng không được để trống',
    url: 'Phải là URL',
    websocketValidator: 'Phải là URL WebSocket',
    isRegExpMatched: 'Mật khẩu phải khớp với biểu thức chính quy:',
    regExpValidator: 'Biểu thức chính quy này không hợp lệ',
    domainValidator: 'Tên miền không đúng',
    decimalValidator: 'Độ chính xác thập phân không được quá { count } chữ số',
    latinWithNumber:
      'Mã phải chỉ chứa chữ cái (A-Z, a-z) và số (0-9), và phải bắt đầu bằng chữ cái',
    integer: 'Trường này chỉ được chứa số nguyên',
    nameAlreadyInUse: 'Tên này đã được sử dụng',
  },
  webitelUI: {
    searchBar: {
      placeholder: 'Tìm kiếm',
      settingsHint: 'Chế độ tìm kiếm',
      variableSearchHint: 'Định dạng truy vấn: "key=value"',
    },
    timepicker: {
      day: 'Ngày:',
      hour: 'Giờ:',
      min: 'Phút:',
      sec: 'Giây:',
    },
    datetimepicker: {
      lastHour: 'Giờ trước',
      lastDay: 'Ngày trước',
    },
    pagination: {
      sizeText: 'Số dòng mỗi trang:',
      prev: 'Trước',
      next: 'Sau',
    },
    appNavigator: {
      title: 'Các ứng dụng Webitel',
      admin: 'Quản trị',
      agent: 'Tổng đài viên',
      supervisor: 'Giám sát viên',
      audit: 'Kiểm toán',
      history: 'Lịch sử',
      grafana: 'Grafana',
      crm: 'CRM',
    },
    headerActions: {
      account: 'Tài khoản',
      docs: 'Tài liệu',
      settings: 'Cài đặt',
      logout: 'Đăng xuất',
      buildVersion: 'Phiên bản',
    },
    tableActions: {
      filterReset: 'Đặt lại bộ lọc',
      columnSelect: 'Chọn cột',
      refreshTable: 'Làm mới bảng',
      expandFilters: 'Mở rộng bộ lọc',
    },
    tableColumnSelect: {
      title: 'Chọn cột hiển thị',
    },
    statusSelect: {
      online: 'Trực tuyến',
      pause: 'Tạm dừng',
      offline: 'Ngoại tuyến',
      breakOut: 'Giải lao',
    },
    iconAction: {
      hints: {
        [IconAction.DELETE]: ({ linked }) => linked('reusable.delete'),
        [IconAction.EDIT]: ({ linked }) => linked('reusable.edit'),
        [IconAction.ADD]: ({ linked }) => linked('reusable.add'),
        [IconAction.HISTORY]: ({ linked }) => linked('reusable.history'),
        [IconAction.DOWNLOAD]: ({ linked }) => linked('reusable.download'),
        [IconAction.FILTERS]: ({ linked }) => linked('reusable.filter'),
        [IconAction.COLUMNS]: 'Chọn cột',
        [IconAction.VARIABLES]: 'Chọn cột biến',
        [IconAction.REFRESH]: ({ linked }) => linked('reusable.refresh'),
        [IconAction.EXPAND]: ({ linked }) => linked('reusable.expand'),
        [IconAction.COLLAPSE]: ({ linked }) => linked('reusable.collapse'),
        [IconAction.CLOSE]: ({ linked }) => linked('reusable.close'),
        [IconAction.CLEAR]: ({ linked }) =>
          linked('webitelUI.tableActions.filterReset'),
        [IconAction.ADD_FILTER]: ({ linked }) => linked('reusable.add'),
        [IconAction.SAVE]: ({ linked }) => linked('reusable.save'),
        [IconAction.CANCEL]: ({ linked }) => linked('reusable.cancel'),
        [IconAction.SAVE_PRESET]: ({ linked }) => {
          return `${linked('reusable.save')} ${linked(
            'webitelUI.filters.presets.preset',
          ).toLowerCase()}`;
        },
        [IconAction.APPLY_PRESET]: ({ linked }) => {
          return `${linked('vocabulary.apply')} ${linked(
            'webitelUI.filters.presets.preset',
          ).toLowerCase()}`;
        },
        [IconAction.ADD_CONTACT]: ({ linked }) => {
          return `${linked('reusable.add')} liên hệ`;
        },
      },
    },
    errorPages: {
      goBack: 'Quay lại',
      page403: {
        title: 'Từ chối truy cập',
        text: 'Xin lỗi, bạn không có đủ quyền để xem trang này.',
      },
      page404: {
        title: 'Có vẻ như bạn đã lạc đường',
        text: 'Xin lỗi, chúng tôi không thể tìm thấy trang bạn muốn.',
      },
    },
    copyAction: {
      copy: 'Sao chép',
      copied: 'Đã sao chép vào clipboard!',
    },
    auditForm: {
      question: 'Tiêu chí',
      option: 'Tùy chọn | Các tùy chọn',
      score: 'Điểm | Điểm số',
      addQuestion: 'Thêm tiêu chí',
      answerType: 'Loại câu trả lời',
      type: {
        options: 'Tùy chọn',
        score: 'Điểm',
      },
      clearSelection: 'Xóa lựa chọn',
    },
    deleteConfirmationPopup: {
      title: 'Xác nhận xóa',
      askingAlert:
        'Bạn có chắc chắn muốn xóa {subject}? Hành động này không thể hoàn tác.',
      tableAskingAlert:
        'Bạn có chắc chắn muốn\n xóa {count} bản ghi? | Bạn có chắc chắn muốn\n xóa {count} bản ghi?',
      deleteAll: 'TẤT CẢ',
    },
    dummy: {
      text: 'Chưa có bản ghi nào',
    },
    empty: {
      text: {
        empty: 'Chưa có bản ghi nào',
        filters: 'Rất tiếc, không có bản ghi nào phù hợp với tiêu chí của bạn',
      },
    },
    agentStatusSelect: {
      pauseCausePopup: {
        title: 'Chọn lý do tạm dừng',
        min: 'Phút',
        unlimited: 'Không giới hạn',
      },
      statusSelectErrorPopup: {
        title: 'Chú ý',
        message:
          'Đã vượt quá giới hạn số lượng tổng đài viên tạm dừng. Không thể tạm dừng ngay bây giờ.',
      },
    },
    saveFailedPopup: {
      title: 'Lưu thất bại',
      label: 'Đã xảy ra lỗi, vui lòng thử lại',
      exportToJson: 'Xuất ra JSON',
    },
    filters: {
      datetime: {
        [RelativeDatetimeValue.Today]: 'Hôm nay',
        [RelativeDatetimeValue.ThisWeek]: 'Tuần này',
        [RelativeDatetimeValue.ThisMonth]: 'Tháng này',
        [RelativeDatetimeValue.Custom]: 'Phạm vi ngày tùy chỉnh',
      },
      addFilter: ({ linked }) => {
        return `${linked('reusable.add')} một ${linked(
          'reusable.filter',
        ).toLowerCase()}`;
      },
      filterName: ({ linked }) => {
        return linked('vocabulary.column');
      },
      filterValue: ({ linked }) => {
        return linked('vocabulary.values');
      },
      filterValueFrom: ({ linked }) => {
        const from = linked('reusable.from').toLowerCase();
        return `${linked('vocabulary.values')} ${from}`;
      },
      filterLabel: ({ linked }) => {
        return linked('vocabulary.labels');
      },
      actualReactionTime: ({ linked }) => {
        return linked('cases.actualReactionTime');
      },
      actualResolutionTime: ({ linked }) => {
        return linked('cases.actualResolutionTime');
      },
      agent: ({ linked }) => {
        return linked('objects.agent.agent');
      },
      amdResult: ({ linked }) => {
        return linked('objects.amdResult');
      },
      assignee: ({ linked }) => {
        return linked('cases.assignee');
      },
      author: ({ linked }) => {
        return linked('cases.author');
      },
      cause: ({ linked }) => {
        return linked('objects.hangupCause');
      },
      closeReasonGroups: ({ linked }) => {
        return linked('cases.reason');
      },
      contact: ({ linked }) => {
        return linked('vocabulary.contact');
      },
      contactGroup: ({ linked }) => {
        return linked('cases.groupPerformers');
      },
      createdAt: ({ linked }) => {
        return linked('reusable.createdAt');
      },
      createdAtFrom: ({ linked }) => {
        return linked('reusable.from');
      },
      createdAtTo: ({ linked }) => {
        return linked('reusable.to');
      },
      direction: ({ linked }) => {
        return linked('objects.direction');
      },
      gateway: ({ linked }) => {
        return linked('objects.gateway');
      },
      grantee: ({ linked }) => {
        return linked('objects.grantee');
      },
      hasAttachment: ({ linked }) => {
        return linked('objects.attachment');
      },
      hasFile: ({ linked }) => {
        return linked('objects.hasRecording');
      },
      hasTranscription: ({ linked }) => {
        return linked('objects.transcription');
      },
      hasUser: ({ linked }) => {
        return linked('objects.user');
      },
      impacted: ({ linked }) => {
        return linked('cases.impacted');
      },
      contactLabel: ({ linked }) => {
        return linked('vocabulary.labels');
      },
      contactOwner: ({ linked }) => {
        return linked('objects.owner');
      },
      priority: ({ linked }) => {
        return linked('vocabulary.priority');
      },
      queue: ({ linked }) => {
        return linked('objects.queue.queue');
      },
      rated: 'Đã đánh giá',
      ratedBy: ({ linked }) => {
        return linked('objects.ratedBy');
      },
      rating: ({ linked }) => {
        return linked('cases.rating');
      },
      reactionTime: ({ linked }) => {
        return linked('cases.reactionTime');
      },
      reporter: ({ linked }) => {
        return linked('cases.reporter');
      },
      resolutionTime: ({ linked }) => {
        return linked('cases.resolutionTime');
      },
      score: ({ linked }) => {
        return linked('webitelUI.auditForm.score');
      },
      service: ({ linked }) => {
        return linked('cases.service');
      },
      sla: ({ linked }) => {
        return linked('cases.appliedSLA');
      },
      slaCondition: ({ linked }) => {
        return linked('cases.appliedCondition');
      },
      source: ({ linked }) => {
        return linked('cases.source');
      },
      status: ({ linked }) => {
        return linked('cases.status');
      },
      tag: ({ linked }) => {
        return linked('vocabulary.tag');
      },
      talkDuration: ({ linked }) => {
        return linked('objects.talkDuration');
      },
      team: ({ linked }) => {
        return linked('objects.team');
      },
      totalDuration: ({ linked }) => {
        return linked('objects.totalDuration');
      },
      user: ({ linked }) => {
        return linked('objects.user');
      },
      variable: ({ linked }) => {
        return linked('vocabulary.variables');
      },
      presets: {
        preset: 'Mẫu | Các mẫu',
        overwritePresetTitle: 'Đã tồn tại một mẫu có tên này.',
        overwritePresetText: 'Bạn có muốn thay thế nó không?',
        notifications: {
          success: {
            update: ({ linked }) => {
              return linked('systemNotifications.success.update', {
                entity: linked('filters.presets.preset'),
              });
            },
            create: ({ linked }) => {
              return linked('systemNotifications.success.create', {
                entity: linked('filters.presets.preset'),
              });
            },
            delete: ({ linked }) => {
              return linked('systemNotifications.success.delete', {
                entity: linked('filters.presets.preset'),
              });
            },
          },
        },
      },
    },
  },
  systemNotifications: {
    success: {
      update: ({ named }) =>
        `${named('entity').toLowerCase()} đã được cập nhật`,
      create: ({ named }) => `${named('entity').toLowerCase()} đã được lưu`,
      delete: ({ named }) => `${named('entity').toLowerCase()} đã bị xóa`,
    },
  },
  errorNotifications: {
    chatHistoryApi: 'Đã xảy ra lỗi khi tải lịch sử trò chuyện',
    markChatProcessed: 'Không thể chuyển trò chuyện sang trạng thái "Đã đóng"',
  },
};
